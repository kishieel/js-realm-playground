import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WsService } from '../../ws.service';
import { FruitSpawnedEvent } from '../triggers/fruit-spawned.event';
import { FruitsRepository } from '../../repositories/fruits.repository';

@EventsHandler(FruitSpawnedEvent)
export class FruitSpawnedHandler implements IEventHandler<FruitSpawnedEvent> {
    constructor(
        private readonly fruitsRepository: FruitsRepository,
        private readonly wsService: WsService,
    ) {
    }

    async handle(event: FruitSpawnedEvent) {
        const { fruitId } = event;
        const fruit = await this.fruitsRepository.findById(fruitId);
        this.wsService.addEvent('fruitSpawned', {
            fruit: {
                id: fruit.id,
                coords: fruit.coords,
            },
        });
    }
}
