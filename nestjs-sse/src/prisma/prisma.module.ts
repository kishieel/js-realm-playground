import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { PrismaAsyncOptions, PrismaOptions } from '@app/prisma/prisma.options';
import { PrismaOptionsToken } from '@app/prisma/prisma.consts';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {
    static forRoot(options: PrismaOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: PrismaModule,
            providers: [{ provide: PrismaOptionsToken, useValue: options }, PrismaService],
            exports: [PrismaService],
        };
    }

    static forRootAsync(options: PrismaAsyncOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: PrismaModule,
            providers: [
                {
                    provide: PrismaOptionsToken,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                PrismaService,
            ],
            imports: options.imports,
            exports: [PrismaService],
        };
    }
}
