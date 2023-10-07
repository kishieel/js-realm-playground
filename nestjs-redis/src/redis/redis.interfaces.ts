import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { Provider } from '@nestjs/common';

export interface RedisOptions {
    isGlobal: boolean;
    url: string;
}

export interface RedisAsyncOptions {
    isGlobal: boolean;
    imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory?: (...args: any[]) => Promise<Omit<RedisOptions, 'isGlobal'>> | Omit<RedisOptions, 'isGlobal'>;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    providers?: Provider[];
}
