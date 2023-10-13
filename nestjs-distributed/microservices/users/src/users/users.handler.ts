import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventContent, EventType } from '@kishieel/nestjs-distributed-messaging';
import { UsersService } from '@app/users/users.service';

@Controller()
export class UsersHandler {
    constructor(private readonly usersService: UsersService) {}

    @EventPattern(EventType.UserCreated)
    async handleUserCreated(@Payload() data: EventContent<EventType.UserCreated>) {
        await this.usersService.createUser({
            uuid: data.uuid,
            username: data.username,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }

    @EventPattern(EventType.UserUpdated)
    async handleUserUpdated(@Payload() data: EventContent<EventType.UserUpdated>) {
        await this.usersService.updateUser(
            { uuid: data.uuid },
            {
                uuid: data.uuid,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
        );
    }
}
