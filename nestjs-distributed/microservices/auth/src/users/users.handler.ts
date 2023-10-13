import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventContent, EventType } from '@kishieel/nestjs-distributed-messaging';
import { UsersService } from '@app/users/users.service';

@Controller()
export class UsersHandler {
    constructor(private readonly usersService: UsersService) {}

    @EventPattern(EventType.UserCreated)
    async handleUserCreated(@Payload() data: EventContent<EventType.UserCreated>) {
        await this.usersService.upsertUser({
            where: { uuid: data.uuid },
            create: data,
            update: data,
        });
    }

    @EventPattern(EventType.UserUpdated)
    async handleUserUpdated(@Payload() data: EventContent<EventType.UserUpdated>) {
        await this.usersService.updateUser(
            { uuid: data.uuid },
            {
                username: data.username,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
        );
    }

    @EventPattern(EventType.UserDeleted)
    async handleUserDeleted(@Payload() data: EventContent<EventType.UserDeleted>) {
        await this.usersService.deleteUser(data.uuid);
    }
}
