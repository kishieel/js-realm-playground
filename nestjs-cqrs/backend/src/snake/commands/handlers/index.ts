import { SpawnSnakeHandler } from './spawn-snake.handler';
import { DeleteSnakeHandler } from './delete-snake.handler';
import { UpdateGameHandler } from './update-game.handler';
import { RedirectSnakeHandler } from './redirect-snake.handler';

export const CommandHandlers = [RedirectSnakeHandler, SpawnSnakeHandler, DeleteSnakeHandler, UpdateGameHandler];
