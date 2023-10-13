import { INestApplication, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GatewayConfig, GatewayConfigToken } from '@app/configs/gateway.config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { catchError, forkJoin, map, mergeMap, NEVER, tap, timer } from 'rxjs';
import { all as mergeAll } from 'deepmerge';

export const setupSwagger = async (app: INestApplication) => {
    const logger = new Logger('SetupSwagger');
    const httpService = app.get(HttpService);
    const configService = app.get(ConfigService);
    const { microservices } = configService.getOrThrow<GatewayConfig>(GatewayConfigToken);

    const refresh$ = timer(0, 10_000).pipe(
        tap(() => logger.debug('Refreshing swagger schema...')),
        map(() =>
            microservices.map(({ url }) =>
                httpService.get<OpenAPIObject>(`${url}/api-json`).pipe(
                    catchError(() => {
                        logger.error(`Failed to fetch swagger schema`);
                        return NEVER;
                    }),
                ),
            ),
        ),
        mergeMap((res$) => forkJoin(res$)),
        map((res) => res.map(({ data }) => data)),
    );

    const config = new DocumentBuilder()
        .setTitle('NestJS Gateway')
        .setDescription('The NestJS Gateway API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    let composedDocument;
    refresh$.subscribe((serviceDocuments) => {
        const gatewayDocument = SwaggerModule.createDocument(app, config);
        composedDocument = mergeAll<OpenAPIObject>([...serviceDocuments, gatewayDocument]);
        logger.debug(`Succeeded to update swagger schema`);
    });

    SwaggerModule.setup('/api', app, composedDocument, { patchDocumentOnRequest: () => composedDocument });
};
