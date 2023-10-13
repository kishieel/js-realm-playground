import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'process';

export const GatewayConfigToken = 'GATEWAY_CONFIG';

export const gatewayConfig = registerAs(GatewayConfigToken, () => ({
    microservices: [
        { name: 'AUTH', url: process.env.AUTH_URL, paths: ['/api/auth', '/api/auth/**'] },
        { name: 'USERS', url: process.env.USERS_URL, paths: ['/api/users', '/api/users/**'] },
        { name: 'POSTS', url: process.env.POSTS_URL, paths: ['/api/posts', '/api/posts/**'] },
    ],
}));

export const GatewayConfigKey = gatewayConfig.KEY;
export type GatewayConfig = ConfigType<typeof gatewayConfig>;
