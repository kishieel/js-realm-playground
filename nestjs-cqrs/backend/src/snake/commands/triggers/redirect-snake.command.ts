import { Direction } from '../../enums/direction.enum';

export class RedirectSnakeCommand {
    constructor(
        public readonly snakeId: string,
        public readonly direction: Direction,
    ) {}
}
