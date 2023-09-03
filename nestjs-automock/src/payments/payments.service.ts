import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name);

    chargeAccount(charge: number) {
        this.logger.log('I am just a stub function', { args: charge });
    }
}
