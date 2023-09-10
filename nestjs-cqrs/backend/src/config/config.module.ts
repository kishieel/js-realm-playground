import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { gameConfig } from './game.config';

@Module({
    imports: [
        BaseConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [gameConfig],
        }),
    ],
})
export class ConfigModule {}
