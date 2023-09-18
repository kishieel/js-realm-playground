import { Module } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { AuditsObserver } from './audits.observer';

@Module({
    controllers: [AuditsObserver],
    providers: [AuditsService],
})
export class AuditsModule {}
