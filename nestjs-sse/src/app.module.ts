import { Module } from '@nestjs/common';
import { PollingModule } from './polling/polling.module';
import { StocksModule } from './stocks/stocks.module';
import { ConfigModule } from './configs/config.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { PrismaConfig, PrismaConfigToken } from '@app/configs/prisma.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule,
        ScheduleModule.forRoot(),
        PrismaModule.forRootAsync({
            isGlobal: true,
            useFactory: (configService: ConfigService) => configService.getOrThrow<PrismaConfig>(PrismaConfigToken),
            inject: [ConfigService],
        }),
        PollingModule,
        StocksModule,
    ],
})
export class AppModule {}
