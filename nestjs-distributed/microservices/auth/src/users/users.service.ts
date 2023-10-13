import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.factory';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(
        @Inject(PrismaService)
        private readonly prismaService: PrismaService,
    ) {}

    async upsertUser(args: Prisma.UserUpsertArgs) {
        return await this.prismaService.user.upsert(args);
    }

    async updateUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        return await this.prismaService.user.update({ where, data });
    }

    async deleteUser(uuid: string) {
        return await this.prismaService.user.delete({ where: { uuid } });
    }
}
