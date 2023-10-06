import { DynamicModule, Module } from '@nestjs/common';
import { MessagingService } from '@app/messaging/server/messaging.service';
import { MessagingAsyncOptions, MessagingOptions } from '@app/messaging/server/messaging.interfaces';
import { MessagingOptionsToken } from '@app/messaging/server/messaging.consts';

@Module({})
export class MessagingModule {
    static forRoot(options: MessagingOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: MessagingModule,
            providers: [{ provide: MessagingOptionsToken, useValue: options }, MessagingService],
            exports: [MessagingService],
        };
    }

    static forRootAsync(options: MessagingAsyncOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: MessagingModule,
            providers: [
                {
                    provide: MessagingOptionsToken,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                MessagingService,
            ],
            imports: options.imports,
            exports: [MessagingService],
        };
    }
}
