import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SpawnFruitCommand } from '../triggers/spawn-fruit.command';
import { FruitsRepository } from '../../repositories/fruits.repository';
import { Fruit } from '../../models/fruit.model';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { range } from '../../../utils/functions/range';

@CommandHandler(SpawnFruitCommand)
export class SpawnFruitHandler implements ICommandHandler<SpawnFruitCommand> {
    constructor(
        private readonly fruitsRepository: FruitsRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

    async execute(command: SpawnFruitCommand) {
        const fruit = await this.publisher.mergeObjectContext(new Fruit(randomStringGenerator()));
        fruit.spawn();
        await this.fruitsRepository.save(fruit);
        fruit.commit();
    }
}
