import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SnakeSpawnedEvent } from '../triggers/snake-spawned.event';
import { SnakeService } from '../../snake.service';

@EventsHandler(SnakeSpawnedEvent)
export class SnakeSpawnedHandler implements IEventHandler<SnakeSpawnedEvent> {
    constructor(private readonly snakeService: SnakeService) {}

    handle(event: SnakeSpawnedEvent) {
        const { snakeId, tail, color } = event;
        this.snakeService.addEvent('snakeSpawned', { snakeId, tail, color });
    }
}
