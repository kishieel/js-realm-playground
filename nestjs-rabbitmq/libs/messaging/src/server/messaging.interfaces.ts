import {
    DynamicModule,
    ForwardReference,
    InjectionToken,
    OptionalFactoryDependency,
    Provider,
    Type,
} from '@nestjs/common';

export interface MessagingOptions {
    isGlobal?: boolean;
    url: string;
    queue: string;
    prefetch?: number;
    globalPrefetch?: boolean;
}

export interface MessagingAsyncOptions {
    isGlobal?: boolean;
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory?: (...args: any[]) => Promise<Omit<MessagingOptions, 'isGlobal'>> | Omit<MessagingOptions, 'isGlobal'>;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    providers?: Provider[];
}
