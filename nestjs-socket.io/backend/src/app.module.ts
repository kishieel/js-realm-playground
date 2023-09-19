import { Module } from '@nestjs/common';
import { MessagingModule } from './messaging/messaging.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
    imports: [MessagingModule, ParticipantsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
