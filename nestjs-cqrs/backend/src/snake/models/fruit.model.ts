import { AggregateRoot } from '@nestjs/cqrs';
import { Coords } from '../types/coords.type';
import { FruitSpawnedEvent } from '../events/triggers/fruit-spawned.event';
import { FruitEatenEvent } from '../events/triggers/fruit-eaten.event';
import { FruitDeletedEvent } from '../events/triggers/fruit-deleted.event';
import { range } from '../../utils/functions/range';

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

    spawn(coords?: Coords) {
        this._coords = coords ? coords : { x: range(0, 48), y: range(0, 36) };
        this.apply(new FruitSpawnedEvent(this._id));
    }

    delete() {
        this.apply(new FruitDeletedEvent(this._id))
    }
}
