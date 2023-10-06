import { Controller, Get, Logger } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { EventType, MessagingService, RpcType } from '@app/messaging';

@Controller()
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly messagingService: MessagingService) {}

    @Get('event')
    async emitEvent() {
        this.logger.log(`Emitting event: ${EventType.UserCreated}`);
        await this.messagingService.emit(EventType.UserCreated, { uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff' });
        return 'OK';
    }

    @Get('rpc')
    async sendRequest() {
        this.logger.log(`Sending message: ${RpcType.SendMail}`);
        const data = await firstValueFrom(
            this.messagingService
                .send(RpcType.SendMail, {
                    to: ['john.smith@example.com'],
                    subject: 'Example of RPC over RabbitMQ',
                    body: 'Hello there!',
                })
                .pipe(timeout(10_000)),
        );
        this.logger.log('Response:', data);
        return 'OK';
    }
}
