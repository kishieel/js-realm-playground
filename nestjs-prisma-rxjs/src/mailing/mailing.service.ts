import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailingService {
    private readonly logger = new Logger(MailingService.name);

    async documentCreated() {
        this.logger.log('Mailing...', 'Your document has been created!');
    }

    async documentUpdated() {
        this.logger.log('Mailing...', 'Your document has been updated!');
    }
}
