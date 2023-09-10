import { AggregateRoot } from '@nestjs/cqrs';
import { Direction } from '../enums/direction.enum';
import { Coords } from '../types/coords.type';

export class Fruit extends AggregateRoot {
    private _coords: Coords;

    constructor(private readonly _id: string) {
        super();
    }

    get id() {
        return this._id;
    }

    get coords() {
        return this._coords;
    }

    set coords(coords: Coords) {
        this._coords = coords;
    }

    eaten() {
        // sent message that fruit was eaten
    }
}
