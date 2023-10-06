import { Module } from '@nestjs/common';
import { TopologyModule } from './topology/topology.module';
import { RabbitModule } from './rabbit/rabbit.module';
import { ConfigModule } from '@nestjs/config';
import { rabbitConfig } from './config/rabbit.config';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [rabbitConfig],
            validationSchema: Joi.object({
                RABBIT_API_URL: Joi.string().required(),
                RABBIT_RMQ_URL: Joi.string().required(),
                RABBIT_USERNAME: Joi.string().required(),
                RABBIT_PASSWORD: Joi.string().required(),
            }),
        }),
        TopologyModule,
        RabbitModule,
    ],
})
export class AppModule {}
