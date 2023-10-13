import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaConfig, PrismaConfigToken } from '@app/configs/prisma.config';
import { createPrismaService, PrismaService } from '@app/prisma/prisma.factory';

@Global()
@Module({
    providers: [
        {
            provide: PrismaService,
            useFactory: (configService: ConfigService) => {
                const prismaConfig = configService.getOrThrow<PrismaConfig>(PrismaConfigToken);
                return createPrismaService(prismaConfig);
            },
            inject: [ConfigService],
        },
    ],
    exports: [PrismaService],
})
export class PrismaModule {}
