import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Post } from './external/post.object';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: { federation: 2 },
            sortSchema: true,
            playground: false,
            csrfPrevention: false,
            buildSchemaOptions: {
                orphanedTypes: [Post],
            },
        }),
        UsersModule,
    ],
})
export class AppModule {}
