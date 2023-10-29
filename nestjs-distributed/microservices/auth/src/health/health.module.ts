import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@app/health/health.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthController],
})
export class HealthModule {}
