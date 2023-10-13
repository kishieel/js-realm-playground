import {
    CustomTransportStrategy,
    IncomingRequest,
    OutgoingResponse,
    ReadPacket,
    RmqContext,
    Server,
} from '@nestjs/microservices';
import * as amqp from 'amqplib';
import { Message } from 'amqplib';
import { CLOSE_EVENT, ERROR_EVENT, NO_MESSAGE_HANDLER, RQM_NO_EVENT_HANDLER } from '@nestjs/microservices/constants';
import { isNil, isString, isUndefined } from '@nestjs/common/utils/shared.utils';
import { MessagingServerOptions } from '@lib/strategy/messaging.options';

export class MessagingServer extends Server implements CustomTransportStrategy {
    private server: amqp.Connection = null;
    private channel: amqp.Channel = null;

    constructor(private readonly options: MessagingServerOptions) {
        super();
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }

    async listen(callback: () => void) {
        this.server = await amqp.connect(this.options.rmqUrl, this.options.socketOptions);
        this.server.on(ERROR_EVENT, this.onErrorEvent.bind(this));
        this.server.on(CLOSE_EVENT, this.onCloseEvent.bind(this));

        this.channel = await this.server.createChannel();
        this.channel.on(ERROR_EVENT, this.onErrorEvent.bind(this));
        this.channel.on(CLOSE_EVENT, this.onCloseEvent.bind(this));

        await this.channel.assertExchange(this.options.eventbus, 'direct');
        await this.channel.assertQueue(this.options.queue, this.options.queueOptions);
        await this.channel.consume(this.options.queue, this.consume.bind(this), { noAck: this.options.noAck });

        callback();
    }

    async close() {
        this.channel && (await this.channel.close());
        this.server && (await this.server.close());
    }

    onErrorEvent(error) {
        this.logger.error(error);
        this.options.exitOnError && process.exit(1);
    }

    onCloseEvent(error) {
        this.logger.error(error);
        this.options.exitOnClose && process.exit(1);
    }

    async consume(message: amqp.Message, channel: amqp.Channel) {
        if (isNil(message)) {
            return;
        }
        const { content, properties } = message;
        const rawMessage = this.parseMessageContent(content);
        const packet = await this.deserializer.deserialize(rawMessage, properties);
        const pattern = isString(packet.pattern) ? packet.pattern : JSON.stringify(packet.pattern);

        const rmqContext = new RmqContext([message, channel, pattern]);
        if (isUndefined((packet as IncomingRequest).id)) {
            return this.handleEvent(pattern, packet, rmqContext);
        }
        const handler = this.getHandlerByPattern(pattern);

        if (!handler) {
            const status = 'error';
            const noHandlerPacket = {
                id: (packet as IncomingRequest).id,
                err: NO_MESSAGE_HANDLER,
                status,
            };
            return this.sendMessage(noHandlerPacket, properties.replyTo, properties.correlationId);
        }
        const response$ = this.transformToObservable(await handler(packet.data, rmqContext));
        const publish = <T>(data: T) => this.sendMessage(data, properties.replyTo, properties.correlationId);
        response$ && this.send(response$, publish);
    }

    public async handleEvent(pattern: string, packet: ReadPacket, context: RmqContext): Promise<any> {
        const handler = this.getHandlerByPattern(pattern);
        if (!handler && !this.options.noAck) {
            this.channel.nack(context.getMessage() as Message, false, false);
            return this.logger.warn(RQM_NO_EVENT_HANDLER`${pattern}`);
        }
        const result = super.handleEvent(pattern, packet, context);
        this.channel.ack(context.getMessage() as Message);
        return result;
    }

    public sendMessage<T = any>(message: T, replyTo: any, correlationId: string): void {
        const outgoingResponse = this.serializer.serialize(message as unknown as OutgoingResponse);
        const options = outgoingResponse.options;
        delete outgoingResponse.options;

        const buffer = Buffer.from(JSON.stringify(outgoingResponse));
        this.channel.sendToQueue(replyTo, buffer, { correlationId, ...options, persistent: true });
    }

    private parseMessageContent(content: Buffer) {
        try {
            return JSON.parse(content.toString());
        } catch {
            return content.toString();
        }
    }
}
