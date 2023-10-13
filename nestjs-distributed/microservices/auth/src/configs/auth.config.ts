import { ConfigType, registerAs } from '@nestjs/config';

export const AuthConfigToken = 'AUTH_CONFIG';

export const authConfig = registerAs(AuthConfigToken, () => ({
    jwtSecret: process.env.JWT_SECRET,
}));

export const AuthConfigKey = authConfig.KEY;
export type AuthConfig = ConfigType<typeof authConfig>;
