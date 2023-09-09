import { ICords } from '../../interfaces/cords.interface';

export class SnakeMovedEvent {
    constructor(
        public readonly snakeId: string,
        public readonly tail: ICords[],
    ) {}
}
