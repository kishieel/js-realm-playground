import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SpawnSnakeCommand } from '../triggers/spawn-snake.command';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { Snake } from '../../models/snake.model';

@CommandHandler(SpawnSnakeCommand)
export class SpawnSnakeHandler implements ICommandHandler<SpawnSnakeCommand> {
    constructor(
        private readonly snakesRepository: SnakesRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: SpawnSnakeCommand) {
        const { snakeId } = command;
        const newSnake = new Snake(snakeId);
        const snake = this.publisher.mergeObjectContext(await this.snakesRepository.save(newSnake));
        snake.spawn();
        snake.commit();
    }
}
