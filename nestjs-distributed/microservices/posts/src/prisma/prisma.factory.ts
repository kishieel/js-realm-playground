import { PrismaClient } from '@prisma/client';
import { Prisma } from '.prisma/client';
import { PrismaConfig } from '@app/configs/prisma.config';

export const createPrismaService = (options: PrismaConfig) => {
    return new PrismaClient({
        datasourceUrl: options.url,
        log: options.verbose ? ['info', 'query', 'warn', 'error'] : undefined,
    }).$extends({
        model: {
            $allModels: {
                async exists<T>(this: T, where: Prisma.Args<T, 'findUnique'>['where']): Promise<boolean> {
                    const context = Prisma.getExtensionContext(this);

                    const result = await (context as any).findUnique({ where });
                    return result !== null;
                },
            },
        },
    });
};

export const PrismaService = 'PRISMA_SERVICE';
export type PrismaService = ReturnType<typeof createPrismaService>;
