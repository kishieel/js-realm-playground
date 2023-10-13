import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ConfigService } from '@nestjs/config';
import { GatewayConfig, GatewayConfigToken } from '@app/configs/gateway.config';
import { NestConfig, NestConfigToken } from '@app/configs/nest.config';
import { setupSwagger } from '@app/swagger/setup-swagger';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { decodeTokenMiddleware } from '@app/auth/decode-token.middleware';
import { CustomStrategy } from '@nestjs/microservices';
import { MessagingServer, MessagingService } from '@kishieel/nestjs-distributed-messaging';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(helmet());
    app.setGlobalPrefix('/api', { exclude: ['/health/(.*)'] });

    const configService = await app.get(ConfigService);
    const nestConfig = await configService.getOrThrow<NestConfig>(NestConfigToken);
    const gatewayConfig = await configService.getOrThrow<GatewayConfig>(GatewayConfigToken);
    const rabbitConfig = await configService.getOrThrow<RabbitConfig>(RabbitConfigToken);
    const messagingService = await app.get<MessagingService>(MessagingService);

    app.use(decodeTokenMiddleware(messagingService));

    const logger = new Logger('HPMProxy');
    gatewayConfig.microservices.forEach((microservice) => {
        app.use(
            microservice.paths,
            createProxyMiddleware({
                target: microservice.url,
                changeOrigin: true,
                selfHandleResponse: true,
                onProxyRes: (proxyRes, req, res) => {
                    res.statusCode = proxyRes.statusCode;
                    res.statusMessage = proxyRes.statusMessage;
                    res.contentType(proxyRes.headers['content-type']);
                    proxyRes.pipe(res);
                },
                logProvider: () => {
                    return {
                        log: logger.log.bind(logger),
                        info: logger.log.bind(logger),
                        debug: logger.debug.bind(logger),
                        warn: logger.warn.bind(logger),
                        error: logger.error.bind(logger),
                    };
                },
            }),
        );
    });

    await setupSwagger(app);

    app.connectMicroservice<CustomStrategy>({
        strategy: new MessagingServer({
            rmqUrl: rabbitConfig.rmqUrl,
            queue: rabbitConfig.queue,
            eventbus: rabbitConfig.eventbus,
            exitOnError: rabbitConfig.exitOnError,
            exitOnClose: rabbitConfig.exitOnClose,
        }),
    });
    await app.startAllMicroservices();

    await app.listen(nestConfig.port, nestConfig.host);
}

bootstrap();
