import { CustomTransportStrategy, OutgoingResponse, RmqContext, Server } from "@nestjs/microservices";
import { ConfirmChannel, ConsumeMessage, Message } from 'amqplib';
import { AmqpConnectionManager, ChannelWrapper, connect } from 'amqp-connection-manager';
import { CONNECT_EVENT, CONNECT_FAILED_EVENT, DISCONNECT_EVENT, ERROR_EVENT } from '@nestjs/microservices/constants';
import { Logger } from '@nestjs/common';
import { MessagingOptions } from '@app/messaging/server/messaging.interfaces';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { ReadPacket } from '@nestjs/microservices/interfaces';

export class MessagingServer extends Server implements CustomTransportStrategy {
    protected logger = new Logger(MessagingServer.name);
    private connection?: AmqpConnectionManager;
    private channel?: ChannelWrapper;

    constructor(private readonly options: MessagingOptions) {
        super();
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }

    async listen(callback: () => void): Promise<void> {
        this.connection = await connect(this.options.url);
        this.connection.on(CONNECT_EVENT, async () => {
            if (!!this.channel) return;
            this.channel = this.connection.createChannel({
                json: false,
                setup: (channel: ConfirmChannel) => {
                    this.setupChannel(channel);
                    callback();
                },
            });
            this.channel.on(ERROR_EVENT, (err) => {
                this.logger.error(err);
            });
            this.channel.on(DISCONNECT_EVENT, (err) => {
                this.logger.error(err);
            });
        });
        this.connection.on(CONNECT_FAILED_EVENT, (err) => {
            this.logger.error(err);
        });
        this.connection.on(DISCONNECT_EVENT, (err) => {
            this.logger.error(err);
            this.close();
        });
        this.connection.on(ERROR_EVENT, (err) => {
            this.logger.error(err);
        });
    }

    async setupChannel(channel: ConfirmChannel) {
        const { queue } = this.options;

        await channel.checkQueue(queue);
        await channel.prefetch(this.options.prefetch, this.options.globalPrefetch);
        await channel.consume(queue, (message) => this.consumeMessage(channel, message));
    }

    async consumeMessage(channel: ConfirmChannel, message: ConsumeMessage) {
        if (isNil(message)) return;

        const raw = JSON.parse(message.content.toString());
        const packet = await this.deserializer.deserialize(raw);
        const pattern = packet.pattern;

        const ctx = new RmqContext([message, channel, pattern]);
        if (!message.properties.replyTo) {
            return await this.handleEvent(pattern, packet, ctx);
        }

        const handler = this.getHandlerByPattern(pattern);
        if (!handler) {
            this.logger.error(
                `There is no matching message handler defined in the remote service. Message pattern: ${pattern}`,
            );
            channel.nack(message, false, false);
        }

        const response$ = this.transformToObservable(await handler(packet.data, ctx));
        const publish = (response: OutgoingResponse) => {
            const serialized = this.serializer.serialize(response);
            const content = Buffer.from(JSON.stringify(serialized));
            this.channel.sendToQueue(message.properties.replyTo, content, { persistent: true });
        };
        response$ && this.send(response$, publish);
    }

    async handleEvent(pattern: string, packet: ReadPacket, context: RmqContext) {
        await super.handleEvent(pattern, packet, context);
        this.channel.ack(context.getMessage() as Message);
    }

    async close(): Promise<void> {
        await this.channel?.close();
        await this.connection?.close();
    }
}
