import { ConfigType, registerAs } from '@nestjs/config';
import { Eventbus, Queue } from '@kishieel/nestjs-distributed-messaging';

export const RabbitConfigToken = 'RABBIT_CONFIG';

export const rabbitConfig = registerAs(RabbitConfigToken, () => ({
    rmqUrl: process.env.RABBIT_RMQ_URL,
    httpUrl: process.env.RABBIT_HTTP_URL,
    queue: Queue.Auth,
    eventbus: Eventbus.Internal,
    exitOnError: true,
    exitOnClose: true,
}));

export const RabbitConfigKey = rabbitConfig.KEY;
export type RabbitConfig = ConfigType<typeof rabbitConfig>;
