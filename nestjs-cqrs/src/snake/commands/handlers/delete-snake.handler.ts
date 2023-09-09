import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { DeleteSnakeCommand } from '../triggers/delete-snake.command';

@CommandHandler(DeleteSnakeCommand)
export class DeleteSnakeHandler implements ICommandHandler<DeleteSnakeCommand> {
    constructor(
        private readonly snakesRepository: SnakesRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: DeleteSnakeCommand) {
        const { snakeId } = command;
        const snake = this.publisher.mergeObjectContext(await this.snakesRepository.findById(snakeId));
        snake.delete();
        snake.commit();
        await this.snakesRepository.deleteById(snakeId);
    }
}
