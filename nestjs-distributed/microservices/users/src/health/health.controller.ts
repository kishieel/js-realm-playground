import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { NestConfig, NestConfigKey } from '@app/configs/nest.config';
import { PrismaService } from '@app/prisma/prisma.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Auth API')
export class HealthController {
    constructor(
        @Inject(NestConfigKey)
        private readonly nestConfig: NestConfig,
        private readonly health: HealthCheckService,
        private readonly prisma: PrismaHealthIndicator,
        private readonly http: HttpHealthIndicator,
        @Inject(PrismaService)
        private readonly prismaService: PrismaService,
    ) {}

    @Get('/liveness')
    @ApiExcludeEndpoint()
    @HealthCheck()
    checkLiveness() {
        return this.health.check([() => ({ service: { status: 'up' } })]);
    }

    @Get('/readiness')
    @ApiExcludeEndpoint()
    @HealthCheck()
    checkReadiness() {
        return this.health.check([
            () => ({ service: { status: 'up' } }),
            () => this.prisma.pingCheck('prisma', this.prismaService),
            () => this.http.pingCheck('rabbit', 'http://guest:guest@rabbit-1:15672/api/overview'),
        ]);
    }
}
