import {
    DynamicModule,
    ForwardReference,
    InjectionToken,
    OptionalFactoryDependency,
    Provider,
    Type,
} from '@nestjs/common';

export interface PrismaOptions {
    isGlobal: boolean;
    url: string;
    verbose?: boolean;
}

export interface PrismaAsyncOptions {
    isGlobal?: boolean;
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory?: (...args: any[]) => Promise<Omit<PrismaOptions, 'isGlobal'>> | Omit<PrismaOptions, 'isGlobal'>;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    providers?: Provider[];
}
