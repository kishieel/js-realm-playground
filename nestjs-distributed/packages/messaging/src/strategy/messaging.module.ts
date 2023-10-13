import { DynamicModule, Module } from '@nestjs/common';
import { MessagingClientAsyncOptions, MessagingClientOptions } from '@lib/strategy/messaging.options';
import { MessagingOptionsToken } from '@lib/strategy/messaging.consts';
import { MessagingService } from '@lib/strategy/messaging.service';
import { Eventbus } from '@lib/consts/eventbus.enum';

@Module({})
export class MessagingModule {
    static forRoot(options: Omit<MessagingClientOptions, 'eventbus'>): DynamicModule {
        return {
            global: true,
            module: MessagingModule,
            providers: [
                {
                    provide: Eventbus.Internal,
                    useFactory: (options: MessagingClientOptions) => {
                        return new MessagingService({
                            ...options,
                            eventbus: Eventbus.Internal,
                        });
                    },
                    inject: [MessagingOptionsToken],
                },
                {
                    provide: Eventbus.External,
                    useFactory: (options: MessagingClientOptions) => {
                        return new MessagingService({
                            ...options,
                            eventbus: Eventbus.External,
                        });
                    },
                    inject: [MessagingOptionsToken],
                },
                {
                    provide: Eventbus.Global,
                    useFactory: (options: MessagingClientOptions) => {
                        return new MessagingService({
                            ...options,
                            eventbus: Eventbus.Global,
                        });
                    },
                    inject: [MessagingOptionsToken],
                },
            ],
            exports: [Eventbus.Internal, Eventbus.External, Eventbus.Global],
        };
    }

    static forRootAsync(options: MessagingClientAsyncOptions): DynamicModule {
        return {
            global: true,
            module: MessagingModule,
            providers: [
                {
                    provide: MessagingOptionsToken,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                {
                    provide: Eventbus.Internal,
                    useFactory: (options: MessagingClientOptions) => {
                        return new MessagingService({
                            ...options,
                            eventbus: Eventbus.Internal,
                        });
                    },
                    inject: [MessagingOptionsToken],
                },
                {
                    provide: Eventbus.External,
                    useFactory: (options: MessagingClientOptions) => {
                        return new MessagingService({
                            ...options,
                            eventbus: Eventbus.External,
                        });
                    },
                    inject: [MessagingOptionsToken],
                },
                {
                    provide: Eventbus.Global,
                    useFactory: (options: MessagingClientOptions) => {
                        return new MessagingService({
                            ...options,
                            eventbus: Eventbus.Global,
                        });
                    },
                    inject: [MessagingOptionsToken],
                },
            ],
            imports: options.imports,
            exports: [Eventbus.Internal, Eventbus.External, Eventbus.Global],
        };
    }
}
