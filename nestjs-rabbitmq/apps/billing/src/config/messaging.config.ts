import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'process';
import { Queue } from '@app/messaging';

export const MessagingConfigToken = 'MESSAGING_CONFIG';

export const messagingConfig = registerAs(MessagingConfigToken, () => ({
    url: process.env.RABBIT_URL,
    queue: Queue.Billing,
}));

export const MessagingConfigKey = messagingConfig.KEY;
export type MessagingConfig = ConfigType<typeof messagingConfig>;
