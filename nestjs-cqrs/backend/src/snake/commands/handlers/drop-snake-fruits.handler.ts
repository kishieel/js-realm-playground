import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DropSnakeFruitsCommand } from '../triggers/drop-snake-fruits.command';
import { FruitsRepository } from '../../repositories/fruits.repository';
import { Fruit } from '../../models/fruit.model';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { range } from '../../../utils/functions/range';

@CommandHandler(DropSnakeFruitsCommand)
export class DropSnakeFruitsHandler implements ICommandHandler<DropSnakeFruitsCommand> {
    constructor(
        private readonly fruitsRepository: FruitsRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

    async execute(command: DropSnakeFruitsCommand) {
        const { loot } = command;
        await Promise.all(loot.map(async (coords) => {
            const fruit = await this.publisher.mergeObjectContext(new Fruit(randomStringGenerator()));
            fruit.spawn(coords);
            await this.fruitsRepository.save(fruit);
            fruit.commit();
        }));
    }


}
