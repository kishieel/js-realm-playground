import { ConfigType, registerAs } from '@nestjs/config';

export const POSTS_CONFIG_TOKEN = 'POSTS_CONFIG';

export const postsConfig = registerAs(POSTS_CONFIG_TOKEN, () => ({
    authSecret: 'posts-auth-secret',
}));

export const POSTS_CONFIG_KEY = postsConfig.KEY;
export type PostsConfig = ConfigType<typeof postsConfig>;
