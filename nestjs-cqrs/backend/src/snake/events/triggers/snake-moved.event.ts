import { Coords } from '../../types/coords.type';

export class SnakeMovedEvent {
    constructor(
        public readonly snakeId: string,
        public readonly tail: Coords[],
    ) {}
}
