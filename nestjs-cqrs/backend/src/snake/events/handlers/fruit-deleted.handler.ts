import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WsService } from '../../ws.service';
import { FruitDeletedEvent } from '../triggers/fruit-deleted.event';

@EventsHandler(FruitDeletedEvent)
export class FruitDeletedHandler implements IEventHandler<FruitDeletedEvent> {
    constructor(private readonly wsService: WsService) {
    }

    async handle(event: FruitDeletedEvent) {
        const { fruitId } = event;
        this.wsService.addEvent('fruitDeleted', { fruitId });
    }
}
