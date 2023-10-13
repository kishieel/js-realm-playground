import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Eventbus, MessagingServer, Queue } from '@kishieel/nestjs-distributed-messaging';
import { NestConfig, NestConfigToken } from '@app/configs/nest.config';
import { CustomStrategy } from '@nestjs/microservices';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api/posts', { exclude: ['/health/(.*)'] });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            forbidUnknownValues: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Posts Microservice')
        .setDescription('The Posts Microservice API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);

    const configService = await app.get(ConfigService);
    const nestConfig = await configService.getOrThrow<NestConfig>(NestConfigToken);
    const rabbitConfig = await configService.getOrThrow<RabbitConfig>(RabbitConfigToken);

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
