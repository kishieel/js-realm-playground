import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaOptionsToken } from '@app/prisma/prisma.consts';
import { PrismaOptions } from '@app/prisma/prisma.options';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject(PrismaOptionsToken)
        private readonly options: PrismaOptions,
    ) {
        super({
            datasourceUrl: options.url,
            log: options.verbose ? ['info', 'query', 'warn', 'error'] : undefined,
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
