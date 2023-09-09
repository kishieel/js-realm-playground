import { SnakeSpawnedHandler } from './snake-spawned.handler';
import { SnakeDeletedHandler } from './snake-deleted.handler';
import { SnakeMovedHandler } from './snake-moved.handler';

export const EventHandlers = [SnakeSpawnedHandler, SnakeDeletedHandler, SnakeMovedHandler];
