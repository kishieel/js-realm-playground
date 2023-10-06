import { ClientProxy, ReadPacket } from '@nestjs/microservices';
import { MessagingOptions } from '@app/messaging/server/messaging.interfaces';
import { AmqpConnectionManager, ChannelWrapper, connect } from 'amqp-connection-manager';
import { WritePacket } from '@nestjs/microservices/interfaces';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { rpcRouter } from '@app/messaging/routing/rpc-router.map';
import { Logger } from '@nestjs/common';

export class MessagingClient extends ClientProxy {
    private readonly logger = new Logger(MessagingClient.name);
    private connection?: AmqpConnectionManager;
    private channel?: ChannelWrapper;

    constructor(private readonly options: MessagingOptions) {
        super();
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }

    async connect() {
        this.connection = await connect(this.options.url);
        this.channel = await this.connection.createChannel();
        await this.channel.waitForConnect();
    }

    async close(): Promise<void> {
        await this.channel.close();
        await this.connection.close();
    }

    protected async dispatchEvent(packet: ReadPacket): Promise<any> {
        const channel = await this.getChannel();

        const serialized = this.serializer.serialize(packet);
        const content = Buffer.from(JSON.stringify(serialized));

        await channel.publish(packet.pattern, packet.pattern, content, { persistent: true });
    }

    protected publish(packet: ReadPacket, callback: (packet: WritePacket) => void): () => void {
        const publish = async () => {
            const channel = await this.getChannel();

            const inQueue = `rpc.${randomStringGenerator()}`;
            const outQueue = rpcRouter.get(packet.pattern);

            await channel.assertQueue(inQueue, { autoDelete: true, exclusive: true });
            await channel.checkQueue(outQueue);
            await channel.consume(inQueue, async (message) => {
                const raw = JSON.parse(message.content.toString());
                const { response, err, isDisposed } = await this.deserializer.deserialize(raw);
                callback({ response, err, isDisposed });
            });

            const serialized = this.serializer.serialize(packet);
            const content = Buffer.from(JSON.stringify(serialized));
            await channel.sendToQueue(outQueue, content, { replyTo: inQueue }).catch((err) => callback({ err }));
        };
        publish().catch((err) => this.logger.error(err));

        return () => void 0;
    }

    protected async getChannel() {
        if (!!this.channel) {
            return this.channel;
        }

        await this.connect();
        return this.channel;
    }
}
