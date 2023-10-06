import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventContent, EventType } from '@app/messaging';

@Controller()
export class BillingController {
    @EventPattern(EventType.UserCreated)
    handleUserCreated(@Payload() data: EventContent<EventType.UserCreated>) {
        console.log({ data });
    }

    @EventPattern(EventType.UserUpdated)
    handleUserUpdated(@Payload() data: EventContent<EventType.UserUpdated>) {
        console.log({ data });
    }

    @EventPattern(EventType.UserDeleted)
    handleUserDeleted(@Payload() data: EventContent<EventType.UserDeleted>) {
        console.log({ data });
    }
}
