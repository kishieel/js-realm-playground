import { Module } from '@nestjs/common';
import { AuditsService } from './audits.service';

@Module({
    providers: [AuditsService],
    exports: [AuditsService],
})
export class AuditsModule {}
