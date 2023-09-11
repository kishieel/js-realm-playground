import { Coords } from '../../types/coords.type';

export class SnakeDiedEvent {
    constructor(public readonly snakeId: string, public readonly loot: Coords[]) {}
}
