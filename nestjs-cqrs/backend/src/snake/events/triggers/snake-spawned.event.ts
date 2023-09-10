import { Coords } from '../../types/coords.type';
import { Color } from '../../enums/color.enum';

export class SnakeSpawnedEvent {
    constructor(
        public readonly snakeId: string,
        public readonly tail: Coords[],
        public readonly color: Color,
    ) {}
}
