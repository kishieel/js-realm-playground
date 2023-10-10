import { Stock } from '@app/polling/polling.interface';

export abstract class PollingStrategy {
    abstract getStock(): Promise<Stock[]> | Stock[];
}
