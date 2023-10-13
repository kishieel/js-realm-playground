import { ConfigType, registerAs } from '@nestjs/config';

export const PrismaConfigToken = 'PRISMA_CONFIG';

export const prismaConfig = registerAs(PrismaConfigToken, () => ({
    url: process.env.DATABASE_URL,
    verbose: true,
}));

export const PrismaConfigKey = prismaConfig.KEY;
export type PrismaConfig = ConfigType<typeof prismaConfig>;
