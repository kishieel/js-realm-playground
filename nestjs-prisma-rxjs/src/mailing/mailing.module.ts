import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingObserver } from './mailing.observer';

@Module({
    controllers: [MailingObserver],
    providers: [MailingService],
})
export class MailingModule {}
