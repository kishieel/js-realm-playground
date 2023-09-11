import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SnakeDeletedEvent } from '../triggers/snake-deleted.event';
import { WsService } from '../../ws.service';
import { SnakeDiedEvent } from '../triggers/snake-died.event';

@EventsHandler(SnakeDiedEvent)
export class SnakeDiedHandler implements IEventHandler<SnakeDiedEvent> {
    constructor(private readonly wsService: WsService) {}

    async handle(event: SnakeDiedEvent) {
        const { snakeId } = event;
        await this.wsService.addEvent('snakeDied', { snakeId });
    }
}
