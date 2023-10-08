import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Inject, Logger } from '@nestjs/common';
import { ApolloConfig, ApolloConfigKey } from '../configs/apollo.config';
import { directiveEstimator, fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';
import { GraphQLError } from 'graphql/error';

@Plugin()
export class QueryComplexityPlugin implements ApolloServerPlugin {
    private readonly logger = new Logger(QueryComplexityPlugin.name);

    constructor(
        @Inject(ApolloConfigKey)
        private readonly apolloConfig: ApolloConfig,
    ) {}

    async requestDidStart(context: GraphQLRequestContext<any>): Promise<GraphQLRequestListener<any> | void> {
        const maxComplexity = this.apolloConfig.maxComplexity;
        return {
            didResolveOperation: async ({ request, document }) => {
                const complexity = getComplexity({
                    schema: context.schema,
                    operationName: request.operationName,
                    query: document,
                    variables: request.variables,
                    estimators: [
                        // @fixme:  this doesn't seem to work for federation, all fields use default complexity
                        fieldExtensionsEstimator(),
                        directiveEstimator({ name: 'complexity' }),
                        simpleEstimator({ defaultComplexity: 1 }),
                    ],
                });
                if (complexity > maxComplexity) {
                    throw new GraphQLError(
                        `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
                    );
                }
                this.logger.debug(`Query Complexity: ${complexity}`);
            },
        };
    }
}
