import { Module } from '@nestjs/common';
import { SnakeModule } from './snake/snake.module';
import { ConfigModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        SnakeModule,
        ConfigModule,
    ],
})
export class AppModule {}
