import { ConfigType, registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const TYPEORM_CONFIG_TOKEN = 'DATABASE_CONFIG';

export const typeormConfig = registerAs(
    TYPEORM_CONFIG_TOKEN,
    () =>
        ({
            type: 'mysql',
            url: process.env.DATABASE_URL,
            entities: ['dist/**/*.entity.js'],
            migrations: ['dist/**/migrations/*.js'],
        }) as DataSourceOptions,
);

export const TYPEORM_CONFIG_KEY = typeormConfig.KEY;
export type TypeOrmConfig = ConfigType<typeof typeormConfig>;

export const connectionSource = new DataSource(typeormConfig());
