import { Color } from '../enums/color.enum';
import { Coords } from './coords.type';
import { Snake } from './snake.type';
import { Fruit } from './fruit.type';

export type SnakeSpawnedPayload = {
    event: 'snakeSpawned'
    data: {
        snakeId: string,
        tail: Coords[],
        color: Color
    }
}

export type SnakeConfirmedPayload = {
    event: 'snakeConfirmed'
    data: {
        snakeId: string,
    },
}

export type SnakeDeletedPayload = {
    event: 'snakeDeleted'
    data: {
        snakeId: string,
    },
}

export type SnakeDiedPayload = {
    event: 'snakeDied'
    data: {
        snakeId: string,
    },
}

export type SnakeMovedPayload = {
    event: 'snakeMoved'
    data: {
        snakeId: string,
        tail: Coords[],
    },
}

export type SnakesFetchedPayload = {
    event: 'snakesFetched'
    data: {
        snakes: Snake[]
    },
}

export type FruitDeletedPayload = {
    event: 'fruitDeleted'
    data: {
        fruitId: string;
    },
}

export type FruitSpawnedPayload = {
    event: 'fruitSpawned'
    data: {
        fruit: Fruit;
    },
}

export type FruitsFetchedPayload = {
    event: 'fruitsFetched'
    data: {
        fruits: Fruit[],
    },
}


export type WsPayload =
    SnakesFetchedPayload
    | SnakeDiedPayload
    | FruitSpawnedPayload
    | FruitsFetchedPayload
    | FruitDeletedPayload
    | SnakeSpawnedPayload
    | SnakeMovedPayload
    | SnakeConfirmedPayload
    | SnakeDeletedPayload
