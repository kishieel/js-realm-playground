import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { apolloConfig } from './configs/apollo.config';
import { QueryComplexityPlugin } from './plugins/query-complexity.plugin';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [apolloConfig],
        }),
        GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
            driver: ApolloGatewayDriver,
            server: {
                path: '/graphql',
                csrfPrevention: false,
            },
            gateway: {
                debug: true,
                supergraphSdl: new IntrospectAndCompose({
                    subgraphs: [
                        { name: 'users', url: 'http://users:3000/graphql' },
                        { name: 'posts', url: 'http://posts:3000/graphql' },
                    ],
                    pollIntervalInMs: 10_000,
                    subgraphHealthCheck: true,
                }),
                validateSupergraph: true,
                serviceHealthCheck: true,
                pollIntervalInMs: 10_000,
            },
        }),
    ],
    providers: [QueryComplexityPlugin],
})
export class AppModule {}
