import {
    DynamicModule,
    ForwardReference,
    InjectionToken,
    OptionalFactoryDependency,
    Provider,
    Type,
} from '@nestjs/common';

export interface BindingsOptions {
    httpUrl: string;
    eventbus: string;
    queue: string;
}

export interface BindingsAsyncOptions {
    isGlobal?: boolean;
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory?: (...args: any[]) => Promise<BindingsOptions> | BindingsOptions;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    providers?: Provider[];
}
