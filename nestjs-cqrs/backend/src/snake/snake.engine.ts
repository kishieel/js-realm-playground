import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateGameCommand } from './commands/triggers/update-game.command';

@Injectable()
export class SnakeEngine {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Interval(1000 / 15)
    async handleInterval() {
        await this.commandBus.execute(new UpdateGameCommand());
    }
}
