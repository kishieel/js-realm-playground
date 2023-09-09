import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SnakeSpawnedEvent } from '../triggers/snake-spawned.event';
import { SnakeDeletedEvent } from '../triggers/snake-deleted.event';

@EventsHandler(SnakeDeletedEvent)
export class SnakeDeletedHandler implements IEventHandler<SnakeDeletedEvent> {
    handle(event: SnakeDeletedEvent) {
        [event];
    }
}
