import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'process';

export const RabbitConfigToken = 'RABBIT_CONFIG';

export const rabbitConfig = registerAs(RabbitConfigToken, () => ({
    apiUrl: process.env.RABBIT_API_URL,
    rmqUrl: process.env.RABBIT_RMQ_URL,
    username: process.env.RABBIT_USERNAME,
    password: process.env.RABBIT_PASSWORD,
}));

export const RabbitConfigKey = rabbitConfig.KEY;
export type RabbitConfig = ConfigType<typeof rabbitConfig>;
