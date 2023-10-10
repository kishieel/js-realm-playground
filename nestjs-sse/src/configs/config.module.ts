import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { nestConfig } from '@app/configs/nest.config';
import { prismaConfig } from '@app/configs/prisma.config';

@Module({
    imports: [
        BaseConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [nestConfig, prismaConfig],
        }),
    ],
})
export class ConfigModule {}
