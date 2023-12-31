import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SnakeMovedEvent } from '../triggers/snake-moved.event';
import { WsService } from '../../ws.service';

@EventsHandler(SnakeMovedEvent)
export class SnakeMovedHandler implements IEventHandler<SnakeMovedEvent> {
    constructor(private readonly snakeService: WsService) {}

    handle(event: SnakeMovedEvent) {
        const { snakeId, tail } = event;
        this.snakeService.addEvent('snakeMoved', { snakeId, tail });
    }
}
