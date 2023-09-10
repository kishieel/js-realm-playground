import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { RedirectSnakeCommand } from '../triggers/redirect-snake.command';

@CommandHandler(RedirectSnakeCommand)
export class RedirectSnakeHandler implements ICommandHandler<RedirectSnakeCommand> {
    constructor(
        private readonly snakesRepository: SnakesRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: RedirectSnakeCommand) {
        const { snakeId, direction } = command;
        const snake = this.publisher.mergeObjectContext(await this.snakesRepository.findById(snakeId));
        snake.direction = direction;
        snake.commit();
    }
}
