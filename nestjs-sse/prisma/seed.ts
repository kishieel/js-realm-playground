import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
    const pricedAt = new Date('2023-10-10');
    await Promise.all([
        prisma.stock.create({
            data: {
                symbol: 'TSLA',
                company: 'Tesla, Inc. Common Stock',
                prices: { create: { price: 264.8901, pricedAt } },
            },
        }),
        prisma.stock.create({
            data: {
                symbol: 'ARKQ',
                company: 'ARK Autonomous Technology & Robotics ETF',
                prices: { create: { price: 53.4715, pricedAt } },
            },
        }),
        prisma.stock.create({
            data: {
                symbol: 'AVAV',
                company: 'AeroVironment, Inc. Common Stock',
                prices: { create: { price: 109.31, pricedAt } },
            },
        }),
        prisma.stock.create({
            data: {
                symbol: 'CDNS',
                company: 'Cadence Design Systems, Inc. Common Stock',
                prices: { create: { price: 249.825, pricedAt } },
            },
        }),
        prisma.stock.create({
            data: {
                symbol: 'ROBT',
                company: 'First Trust Nasdaq Artificial Intelligence and Robotics ETF',
                prices: { create: { price: 40.305, pricedAt } },
            },
        }),
    ]);
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
