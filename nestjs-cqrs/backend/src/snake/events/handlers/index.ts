import { SnakeSpawnedHandler } from './snake-spawned.handler';
import { SnakeDeletedHandler } from './snake-deleted.handler';
import { SnakeMovedHandler } from './snake-moved.handler';
import { FruitDeletedHandler } from './fruit-deleted.handler';
import { FruitSpawnedHandler } from './fruit-spawned.handler';
import { SnakeDiedHandler } from './snake-died.handler';

export const EventHandlers = [
    FruitDeletedHandler,
    FruitSpawnedHandler,
    SnakeDiedHandler,
    SnakeSpawnedHandler,
    SnakeDeletedHandler,
    SnakeMovedHandler
];
