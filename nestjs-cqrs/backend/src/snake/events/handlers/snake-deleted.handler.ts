import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SnakeDeletedEvent } from '../triggers/snake-deleted.event';
import { WsService } from '../../ws.service';

@EventsHandler(SnakeDeletedEvent)
export class SnakeDeletedHandler implements IEventHandler<SnakeDeletedEvent> {
    constructor(private readonly wsService: WsService) {}

    async handle(event: SnakeDeletedEvent) {
        const { snakeId } = event;
        await this.wsService.addEvent('snakeDeleted', { snakeId });
    }
}
