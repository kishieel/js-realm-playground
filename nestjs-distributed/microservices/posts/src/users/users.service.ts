import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.factory';

@Injectable()
export class UsersService {
    constructor(
        @Inject(PrismaService)
        private readonly prismaService: PrismaService,
    ) {}

    async createUser(data: Prisma.UserCreateInput) {
        return await this.prismaService.user.create({ data });
    }

    async updateUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        return await this.prismaService.user.update({ where, data });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput) {
        return await this.prismaService.user.delete({ where });
    }
}
