import { Module } from '@nestjs/common';
import { PollingTask } from './polling.task';
import { PollingStrategy } from '@app/polling/polling.strategy';
import { MockStrategy } from '@app/polling/strategies/mock.strategy';

@Module({
    providers: [
        {
            provide: PollingStrategy,
            useClass: MockStrategy,
        },
        PollingTask,
    ],
})
export class PollingModule {}
