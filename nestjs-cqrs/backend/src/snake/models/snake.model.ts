import { AggregateRoot } from '@nestjs/cqrs';
import { Coords } from '../types/coords.type';
import { Direction } from '../enums/direction.enum';
import { SnakeSpawnedEvent } from '../events/triggers/snake-spawned.event';
import { Inject } from '@nestjs/common';
import { GAME_CONFIG_KEY, GameConfig } from '../../config/game.config';
import { range } from '../../utils/functions/range';
import { Color } from '../enums/color.enum';
import { SnakeDeletedEvent } from '../events/triggers/snake-deleted.event';
import { SnakeMovedEvent } from '../events/triggers/snake-moved.event';
import { SnakeDiedEvent } from '../events/triggers/snake-died.event';
import { FruitEatenEvent } from '../events/triggers/fruit-eaten.event';

export class Snake extends AggregateRoot {
    @Inject(GAME_CONFIG_KEY)
    private readonly gameConfig: GameConfig;

    private _tail: Coords[];
    private _color: Color;
    private _direction: Direction;

    constructor(private readonly _id: string) {
        super();
    }

    get id() {
        return this._id;
    }

    get tail() {
        return this._tail;
    }

    get color() {
        return this._color;
    }

    get direction() {
        return this._direction;
    }

    set direction(direction: Direction) {
        this._direction = direction;
    }

    get head() {
        return this._tail[0];
    }

    spawn() {
        this._color = this.getInitialColor();
        this._direction = this.getInitialDirection();
        this._tail = this.getInitialTail();
        this.apply(new SnakeSpawnedEvent(this._id, this._tail, this._color));
    }

    move() {
        const delta = this.getMovementDelta();
        const newHead = {
            x: this._tail[0].x + delta.x,
            y: this._tail[0].y + delta.y,
        }
        this._tail.unshift(newHead);
        this._tail.pop();

        if (this._tail[0].x < 0) this._tail[0].x = 48 - 1;
        if (this._tail[0].x >= 48) this._tail[0].x = 0;
        if (this._tail[0].y < 0) this._tail[0].y = 36 - 1;
        if (this._tail[0].y >= 36) this._tail[0].y = 0;

        this.apply(new SnakeMovedEvent(this._id, this._tail));
    }

    die() {
        const loot = this._tail.filter(() => Math.random() > 0.5);
        this.apply(new SnakeDiedEvent(this._id, loot))
    }

    eat(fruitId: string) {
        this.apply(new FruitEatenEvent(fruitId, this._id));
    }

    delete() {
        this.apply(new SnakeDeletedEvent(this._id));
    }

    private getInitialColor(): Color {
        const values = Object.values(Color);
        const index = Math.floor(Math.random() * values.length);
        return values[index];
    }

    private getInitialDirection(): Direction {
        const values = Object.values(Direction);
        const index = Math.floor(Math.random() * values.length);
        return values[index];
    }

    private getInitialTail(): Coords[] {
        const initX = range(0, 30); // this.gameConfig.boardSize.x
        const initY = range(0, 30); // this.gameConfig.boardSize.y

        const delta = this.getMovementDelta();
        const tail: Coords[] = [];
        for (let i = 0; i < 5; i++) {
            tail.push({ x: initX + delta.x * i, y: initY + delta.y * i });
        }

        return tail;
    }

    private getMovementDelta() {
        return {
            [Direction.UP]: { x: 0, y: -1 },
            [Direction.DOWN]: { x: 0, y: 1 },
            [Direction.LEFT]: { x: -1, y: 0 },
            [Direction.RIGHT]: { x: 1, y: 0 },
        }[this._direction];
    }
}
