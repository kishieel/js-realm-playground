import { Serializer } from '@nestjs/microservices/interfaces/serializer.interface';
import { Deserializer } from '@nestjs/microservices/interfaces/deserializer.interface';
import { DynamicModule, ForwardReference, InjectionToken, OptionalFactoryDependency, Type } from '@nestjs/common';
import { Queue } from '@lib/consts/queue.enum';
import { Eventbus } from '@lib/consts/eventbus.enum';

export type MessagingServerOptions = {
    rmqUrl: string;
    queue: Queue;
    eventbus: Eventbus;
    prefetchCount?: number;
    isGlobalPrefetchCount?: boolean;
    serializer?: Serializer;
    deserializer?: Deserializer;
    queueOptions?: any;
    socketOptions?: any;
    noAck?: boolean;
    exitOnError?: boolean;
    exitOnClose?: boolean;
};

export interface MessagingClientOptions {
    rmqUrl: string;
    eventbus: Eventbus;
    prefetchCount?: number;
    isGlobalPrefetchCount?: boolean;
    socketOptions?: any;
}

export type MessagingClientAsyncOptions = {
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory?: (
        ...args: any[]
    ) => Promise<Omit<MessagingClientOptions, 'eventbus'>> | Omit<MessagingClientOptions, 'eventbus'>;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
};
