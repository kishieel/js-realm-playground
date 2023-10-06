import { ConfigType, registerAs } from '@nestjs/config';

export const USERS_CONFIG_TOKEN = 'USERS_CONFIG';

export const usersConfig = registerAs(USERS_CONFIG_TOKEN, () => ({
    authSecret: 'users-auth-secret',
}));

export const USERS_CONFIG_KEY = usersConfig.KEY;
export type UsersConfig = ConfigType<typeof usersConfig>;
