import { PollingStrategy } from '@app/polling/polling.strategy';
import { Injectable } from '@nestjs/common';
import { Stock } from '@app/polling/polling.interface';

@Injectable()
export class NasdaqStrategy extends PollingStrategy {
    async getStock(): Promise<Stock[]> {
        return []; // mock, though this could call to nasdaq or any other API
    }
}
