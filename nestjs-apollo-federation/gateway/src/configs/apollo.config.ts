import { ConfigType, registerAs } from '@nestjs/config';

export const ApolloConfigToken = 'APOLLO_CONFIG';

export const apolloConfig = registerAs(ApolloConfigToken, () => ({
    maxComplexity: 20,
}));

export const ApolloConfigKey = apolloConfig.KEY;
export type ApolloConfig = ConfigType<typeof apolloConfig>;
