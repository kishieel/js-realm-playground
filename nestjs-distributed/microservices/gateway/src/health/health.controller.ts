import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { NestConfig, NestConfigKey } from '@app/configs/nest.config';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('Gateway API')
@Controller('health')
export class HealthController {
    constructor(
        @Inject(NestConfigKey)
        private readonly nestConfig: NestConfig,
        private readonly health: HealthCheckService,
    ) {}

    @Get('/liveness')
    @ApiExcludeEndpoint()
    @HealthCheck({ swaggerDocumentation: false })
    checkLiveness() {
        return this.health.check([() => ({ service: { status: 'up' } })]);
    }

    @Get('/readiness')
    @ApiExcludeEndpoint()
    @HealthCheck()
    checkReadiness() {
        return this.health.check([() => ({ service: { status: 'up' } })]);
    }
}
