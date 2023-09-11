import { Coords } from '../../types/coords.type';

export class DropSnakeFruitsCommand {
    constructor(public readonly loot: Coords[]) {}
}
