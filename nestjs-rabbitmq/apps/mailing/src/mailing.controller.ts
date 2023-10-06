import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { EventContent, EventType, RpcRequestContent, RpcResponseContent, RpcType } from '@app/messaging';

@Controller()
export class MailingController {
    @EventPattern(EventType.UserCreated)
    handleUserCreated(@Payload() data: EventContent<EventType.UserCreated>) {
        console.log({ data });
    }

    @EventPattern(EventType.UserUpdated)
    handleUserUpdated(@Payload() data: EventContent<EventType.UserUpdated>) {
        console.log({ data });
    }

    @EventPattern(EventType.UserDeleted)
    handleUserDeleted(@Payload() data: EventContent<EventType.UserCreated>) {
        console.log({ data });
    }

    @EventPattern(EventType.PaymentCharged)
    handlePaymentCharged(@Payload() data: EventContent<EventType.PaymentCharged>) {
        console.log({ data });
    }

    @MessagePattern(RpcType.SendMail)
    handleSendMail(@Payload() data: RpcRequestContent<RpcType.SendMail>): RpcResponseContent<RpcType.SendMail> {
        console.log({ data });
        return { status: true };
    }
}
