import { ICords } from '../../interfaces/cords.interface';
import { Color } from '../../enums/color.enum';

export class SnakeSpawnedEvent {
    constructor(
        public readonly snakeId: string,
        public readonly tail: ICords[],
        public readonly color: Color,
    ) {}
}
