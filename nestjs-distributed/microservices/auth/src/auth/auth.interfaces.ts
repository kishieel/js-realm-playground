import { Prisma } from '@prisma/client';

export type UserWithRolePermissions = Prisma.UserGetPayload<{
    include: {
        role: {
            include: {
                permissions: {
                    include: {
                        permission: true;
                    };
                };
            };
        };
    };
}>;
