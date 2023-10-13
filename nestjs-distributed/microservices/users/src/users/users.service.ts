import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EventType, MessagingService } from '@kishieel/nestjs-distributed-messaging';

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly eventbus: MessagingService,
    ) {}

    async getUserByUuid(uuid: string) {
        return this.prismaService.user.findUnique({ where: { uuid } });
    }

    async getManyUsers(where?: Prisma.UserWhereInput) {
        return this.prismaService.user.findMany({ where });
    }

    async createUser(data: Prisma.UserCreateInput) {
        return await this.prismaService.user.create({ data });
    }

    async updateUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        const user = await this.prismaService.user.update({ where, data });
        this.eventbus.emit(EventType.UserUpdated, {
            uuid: user.uuid,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
        return user;
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput) {
        const user = await this.prismaService.user.delete({ where });
        this.eventbus.emit(EventType.UserDeleted, { uuid: user.uuid });
        return user;
    }
}
