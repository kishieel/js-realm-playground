import {
    FruitsFetchedPayload,
    SnakeConfirmedPayload,
    SnakeDeletedPayload,
    SnakeMovedPayload,
    SnakesFetchedPayload,
    SnakeSpawnedPayload,
    WsPayload,
} from '../types/ws-payload.types';
import { Snake } from '../types/snake.type';
import { colorToHexMap } from '../maps/color-to-hex.map';
import { keyToDirectionMap } from '../maps/key-to-direction.map';
import { Fruit } from '../types/fruit.type';

export class Engine {
    private readonly snakes: Map<string, Snake> = new Map();
    private readonly fruits: Map<string, Fruit> = new Map();
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly ws: WebSocket;

    constructor(ws: WebSocket) {
        this.ws = ws;

        const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
        if (!canvas) throw new Error('No canvas found!');

        this.canvas = canvas;
        const ctx = canvas.getContext('2d');

        if (!ctx) throw new Error('No ctx found!');
        this.ctx = ctx;
    }

    init() {
        this.ws.send(JSON.stringify({ event: 'snakesRequested' }));
        this.ws.send(JSON.stringify({ event: 'fruitsRequested' }));
    }


    process(payload: WsPayload) {
        switch (payload.event) {
            case 'snakeConfirmed':
                return this.handleSnakeConfirmed(payload.data);
            case 'snakeSpawned':
                return this.handleSnakeSpawned(payload.data);
            case 'snakeMoved':
                return this.handleSnakeMoved(payload.data);
            case 'snakeDeleted':
                return this.handleSnakeDeleted(payload.data);
            case 'snakesFetched':
                return this.handleSnakesFetched(payload.data);
            case 'fruitsFetched':
                return this.handleFruitsFetched(payload.data);
        }
    }

    handleSnakeConfirmed(data: SnakeConfirmedPayload['data']) {
    }

    handleSnakeSpawned(data: SnakeSpawnedPayload['data']) {
        const { snakeId, ...snake } = data;
        this.snakes.set(snakeId, { id: snakeId, ...snake });
    }

    handleSnakeMoved(data: SnakeMovedPayload['data']) {
        const { snakeId, tail } = data;
        const snake = this.snakes.get(snakeId);

        if (!snake) return;
        this.snakes.set(snakeId, { ...snake, tail });
    }

    handleSnakeDeleted(data: SnakeDeletedPayload['data']) {
        const { snakeId } = data;
        this.snakes.delete(snakeId);
    }

    handleSnakesFetched(data: SnakesFetchedPayload['data']) {
        data.snakes.forEach((snake) => this.snakes.set(snake.id, snake));
    }

    handleFruitsFetched(data: FruitsFetchedPayload['data']) {
        data.fruits.forEach((fruit) => this.fruits.set(fruit.id, fruit));
    }

    changeDirection(key: string) {
        const direction = keyToDirectionMap.get(key);
        if (!direction) return;

        this.ws.send(JSON.stringify({
            event: 'directionChanged',
            data: { direction },
        }));
    }

    update() {
        this.redraw();
        this.checkCollisions();
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const fruit of this.fruits.values()) {
            this.ctx.fillStyle = 'gold';
            this.ctx.fillRect(fruit.coords.x * 20, fruit.coords.y * 20, 20, 20);
        }

        for (const snake of this.snakes.values()) {
            this.ctx.fillStyle = colorToHexMap[snake.color];
            snake.tail.forEach((part) => {
                this.ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
            });
        }
    }

    checkCollisions() {

    }
}
