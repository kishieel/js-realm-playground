import { AggregateRoot } from '@nestjs/cqrs';
import { ICords } from '../interfaces/cords.interface';
import { Direction } from '../enums/direction.enum';
import { SnakeSpawnedEvent } from '../events/triggers/snake-spawned.event';
import { Inject } from '@nestjs/common';
import { GAME_CONFIG_KEY, GameConfig } from '../../config/game.config';
import { range } from '../../utils/functions/range';
import { Color } from '../enums/color.enum';
import { SnakeDeletedEvent } from '../events/triggers/snake-deleted.event';
import { SnakeMovedEvent } from '../events/triggers/snake-moved.event';

export class Snake extends AggregateRoot {
    @Inject(GAME_CONFIG_KEY)
    private readonly gameConfig: GameConfig;

    private _tail: ICords[];
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

    spawn() {
        this._color = this.getInitialColor();
        this._direction = this.getInitialDirection();
        this._tail = this.getInitialTail();
        this.apply(new SnakeSpawnedEvent(this._id, this._tail, this._color));
    }

    move() {
        for (let i = this._tail.length - 1; i > 0; i--) {
            this._tail[i].x = this._tail[i - 1].x;
            this._tail[i].y = this._tail[i - 1].y;
        }

        const delta = this.getMovementDelta();
        this._tail[0].x += delta.x;
        this._tail[0].y += delta.y;

        if (this._tail[0].x < 0) this._tail[0].x = 30 - 1;
        if (this._tail[0].x >= 30) this._tail[0].x = 0;
        if (this._tail[0].y < 0) this._tail[0].y = 30 - 1;
        if (this._tail[0].y >= 30) this._tail[0].y = 0;

        this.apply(new SnakeMovedEvent(this._id, this._tail));
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

    private getInitialTail(): ICords[] {
        const initX = range(0, 30); // this.gameConfig.boardSize.x
        const initY = range(0, 30); // this.gameConfig.boardSize.y

        const delta = this.getMovementDelta();
        const tail: ICords[] = [];
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
