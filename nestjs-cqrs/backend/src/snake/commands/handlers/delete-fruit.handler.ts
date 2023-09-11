import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SnakesRepository } from '../../repositories/snakes.repository';
import { DeleteSnakeCommand } from '../triggers/delete-snake.command';
import { DeleteFruitCommand } from '../triggers/delete-fruit.command';
import { FruitsRepository } from '../../repositories/fruits.repository';

@CommandHandler(DeleteFruitCommand)
export class DeleteFruitHandler implements ICommandHandler<DeleteFruitCommand> {
    constructor(
        private readonly fruitsRepository: FruitsRepository,
        private readonly publisher: EventPublisher,
    ) {}

    async execute(command: DeleteFruitCommand) {
        const { fruitId } = command;
        const fruit = this.publisher.mergeObjectContext(await this.fruitsRepository.findById(fruitId));
        fruit.delete();
        await this.fruitsRepository.deleteById(fruitId);
        fruit.commit();
    }
}
