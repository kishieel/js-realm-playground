import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { PostsModule } from './posts/posts.module';
import { User } from './external/user.object';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: { federation: 2 },
            sortSchema: true,
            playground: false,
            csrfPrevention: false,
            buildSchemaOptions: {
                orphanedTypes: [User],
            },
        }),
        PostsModule,
    ],
})
export class AppModule {}
