import { PrismaClient } from '@prisma/client';
import { Permission, Role } from '@kishieel/nestjs-distributed-shared';
import * as process from 'process';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
    await Promise.all([
        prisma.permission.createMany({
            data: [
                { uuid: '7f4592cc-2d24-469c-86a1-f05570b06089', name: Permission.PostRead },
                { uuid: 'a4808ab9-cdba-44ec-afe1-8d7c56480d2a', name: Permission.PostWrite },
                { uuid: '8ebcbb73-74b4-4320-ad57-51becff4d848', name: Permission.UserRead },
                { uuid: '40441c83-c3bd-496a-8da7-2fe0331a0d32', name: Permission.UserWrite },
            ],
            skipDuplicates: true,
        }),
    ]);
    await Promise.all([
        prisma.role.create({
            data: {
                uuid: '3b07f6c0-82f6-40a5-96f9-f4bd4ad684a1',
                name: Role.User,
                permissions: {
                    createMany: {
                        data: [
                            { permissionUuid: '7f4592cc-2d24-469c-86a1-f05570b06089' },
                            { permissionUuid: '8ebcbb73-74b4-4320-ad57-51becff4d848' },
                        ],
                        skipDuplicates: true,
                    },
                },
            },
        }),
        prisma.role.create({
            data: {
                uuid: 'faf93a0c-03de-493e-99db-9d468de790ac',
                name: Role.Admin,
                permissions: {
                    createMany: {
                        data: [
                            { permissionUuid: '7f4592cc-2d24-469c-86a1-f05570b06089' },
                            { permissionUuid: 'a4808ab9-cdba-44ec-afe1-8d7c56480d2a' },
                            { permissionUuid: '8ebcbb73-74b4-4320-ad57-51becff4d848' },
                            { permissionUuid: '40441c83-c3bd-496a-8da7-2fe0331a0d32' },
                        ],
                        skipDuplicates: true,
                    },
                },
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
