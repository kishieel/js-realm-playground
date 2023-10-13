import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DiscoveryModule } from '@nestjs/core';
import { BindingsOptionsToken } from '@lib/bindings/bindings.consts';
import { BindingsAsyncOptions, BindingsOptions } from '@lib/bindings/bindings.options';
import { BindingsBuilderService } from '@lib/bindings/bindings-builder.service';
import { HandlersDiscoveryService } from '@lib/bindings/handlers-discovery.service';

@Module({
    imports: [HttpModule, DiscoveryModule],
})
export class BindingsModule {
    static forRoot(options: BindingsOptions): DynamicModule {
        return {
            module: BindingsModule,
            providers: [
                { provide: BindingsOptionsToken, useValue: options },
                BindingsBuilderService,
                HandlersDiscoveryService,
            ],
        };
    }

    static forRootAsync(options: BindingsAsyncOptions): DynamicModule {
        return {
            module: BindingsModule,
            providers: [
                {
                    provide: BindingsOptionsToken,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                BindingsBuilderService,
                HandlersDiscoveryService,
            ],
            imports: options.imports,
        };
    }
}
