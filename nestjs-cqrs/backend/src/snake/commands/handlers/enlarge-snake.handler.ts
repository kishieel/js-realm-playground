import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { DeleteSnakeCommand } from '../triggers/delete-snake.command';
import { EnlargeSnakeCommand } from '../triggers/enlarge-snake.command';

@CommandHandler(EnlargeSnakeCommand)
export class EnlargeSnakeHandler implements ICommandHandler<EnlargeSnakeCommand> {
    constructor(private readonly snakesRepository: SnakesRepository) {}

    async execute(command: EnlargeSnakeCommand) {
        const { snakeId } = command;
        const snake = await this.snakesRepository.findById(snakeId);
        snake.tail.push(...snake.tail.slice(-1))
    }
}
