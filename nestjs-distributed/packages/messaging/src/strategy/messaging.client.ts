import { ClientProxy, PacketId, ReadPacket, WritePacket } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { MessagingClientOptions } from '@lib/strategy/messaging.options';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { rpcRouter } from '@lib/consts/rpc-router.map';

export class MessagingClient extends ClientProxy {
    private readonly logger = new Logger(MessagingClient.name);
    private server: amqp.Connection = null;
    private channel: amqp.Channel = null;

    constructor(private readonly options: MessagingClientOptions) {
        super();
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }

    async connect() {
        this.server = await amqp.connect(this.options.rmqUrl, this.options.socketOptions);
        this.channel = await this.server.createConfirmChannel();
    }

    async close(): Promise<void> {
        this.channel && (await this.channel.close());
        this.server && (await this.server.close());
    }

    protected async dispatchEvent(packet: ReadPacket): Promise<any> {
        const channel = await this.getChannel();

        const serialized = this.serializer.serialize(packet);
        const content = Buffer.from(JSON.stringify(serialized));

        channel.publish(this.options.eventbus, packet.pattern, content, { persistent: true });
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

            this.assignPacketId(packet);
            const serialized = this.serializer.serialize(packet);
            const content = Buffer.from(JSON.stringify(serialized));
            channel.sendToQueue(outQueue, content, { replyTo: inQueue });
        };
        publish().catch((err) => {
            this.logger.error(err);
            callback({ err });
        });

        return () => void 0;
    }

    protected async getChannel() {
        if (!!this.channel) {
            return this.channel;
        }

        await this.connect();
        return this.channel;
    }

    protected assignPacketId(packet: ReadPacket): ReadPacket & PacketId {
        const id = randomStringGenerator();
        return Object.assign(packet, { id });
    }
}
