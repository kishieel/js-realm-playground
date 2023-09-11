import { SpawnSnakeHandler } from './spawn-snake.handler';
import { DeleteSnakeHandler } from './delete-snake.handler';
import { UpdateGameHandler } from './update-game.handler';
import { RedirectSnakeHandler } from './redirect-snake.handler';
import { DeleteFruitHandler } from './delete-fruit.handler';
import { EnlargeSnakeHandler } from './enlarge-snake.handler';
import { SpawnFruitHandler } from './spawn-fruit.handler';
import { DropSnakeFruitsHandler } from './drop-snake-fruits.handler';

export const CommandHandlers = [
    DropSnakeFruitsHandler,
    DeleteFruitHandler,
    EnlargeSnakeHandler,
    SpawnFruitHandler,
    RedirectSnakeHandler,
    SpawnSnakeHandler,
    DeleteSnakeHandler,
    UpdateGameHandler,
];
