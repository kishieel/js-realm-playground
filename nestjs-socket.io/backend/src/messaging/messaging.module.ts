import { Module } from '@nestjs/common';
import { MessagingGateway } from './messaging.gateway';
import { ParticipantsModule } from '../participants/participants.module';
import { MessagingService } from './messaging.service';
import { MessagingRepository } from './messaging.repository';

@Module({
    imports: [ParticipantsModule],
    providers: [MessagingGateway, MessagingService, MessagingRepository],
})
export class MessagingModule {}
