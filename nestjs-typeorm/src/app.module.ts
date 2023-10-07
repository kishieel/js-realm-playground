import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TYPEORM_CONFIG_TOKEN, TypeOrmConfig } from './configs/typeorm.config';
import { ConfigModule } from './configs/config.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) =>
                configService.getOrThrow<TypeOrmConfig>(TYPEORM_CONFIG_TOKEN),
            inject: [ConfigService],
            extraProviders: [ConfigService],
        }),
        UsersModule,
        DocumentsModule,
    ],
})
export class AppModule {}
