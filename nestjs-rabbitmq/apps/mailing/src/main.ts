import { NestFactory } from '@nestjs/core';
import { MailingModule } from './mailing.module';
import { MessagingOptionsToken, MessagingServer } from "@app/messaging";

async function bootstrap() {
    const app = await NestFactory.create(MailingModule);

    app.connectMicroservice({
        strategy: new MessagingServer(app.get(MessagingOptionsToken)),
    });

    await app.startAllMicroservices();
    await app.listen(3000);
}

bootstrap();
