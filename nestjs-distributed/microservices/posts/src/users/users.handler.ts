import { Controller } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { EventContent, EventType } from '@kishieel/nestjs-distributed-messaging';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersHandler {
    constructor(private readonly usersService: UsersService) {}

    @EventPattern(EventType.UserCreated)
    async handleUserCreated(@Payload() data: EventContent<EventType.UserCreated>) {
        await this.usersService.createUser({ uuid: data.uuid });
    }

    @EventPattern(EventType.UserUpdated)
    async handleUserUpdated(@Payload() data: EventContent<EventType.UserUpdated>) {
        await this.usersService.updateUser({ uuid: data.uuid }, {});
    }

    @EventPattern(EventType.UserDeleted)
    async handleUserDeleted(@Payload() data: EventContent<EventType.UserDeleted>) {
        await this.usersService.deleteUser({ uuid: data.uuid });
    }
}
