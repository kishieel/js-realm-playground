import {
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SpawnSnakeCommand } from './commands/triggers/spawn-snake.command';
import { Server, WebSocket } from 'ws';
import { OnApplicationShutdown } from '@nestjs/common';
import { WsService } from './ws.service';
import { Subscription } from 'rxjs';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { DirectionChangedDto } from './dtos/direction-changed.dto';
import { RedirectSnakeCommand } from './commands/triggers/redirect-snake.command';
import { GetSnakesQuery } from './queries/triggers/get-snakes.query';
import { GetFruitsQuery } from './queries/triggers/get-fruits.query';
import { Snake } from './models/snake.model';
import { Fruit } from './models/fruit.model';

@WebSocketGateway()
export class SnakeGateway implements OnGatewayConnection, OnGatewayInit, OnApplicationShutdown {
    private eventSubscription: Subscription;

    @WebSocketServer()
    server: Server;

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly wsService: WsService,
    ) {
    }

    afterInit(server: Server): void {
        this.eventSubscription = this.wsService.getEventSubject$().subscribe({
            next: (event) => server.clients.forEach((client) => client.send(JSON.stringify(event))),
            error: (err) => server.emit('exception', err),
        });
    }

    onApplicationShutdown() {
        this.eventSubscription.unsubscribe();
    }

    async handleConnection(socket: WebSocket) {
        const snakeId = randomStringGenerator();
        socket.metadata = { snakeId };
        await this.commandBus.execute(new SpawnSnakeCommand(snakeId));
        socket.send(JSON.stringify({ event: 'snakeConfirmed', data: { snakeId } }));
    }

    @SubscribeMessage('directionChanged')
    async handleDirectionChanged(socket: WebSocket, payload: DirectionChangedDto) {
        await this.commandBus.execute(new RedirectSnakeCommand(socket.metadata.snakeId, payload.direction));
    }

    @SubscribeMessage('snakesRequested')
    async handleSnakesRequested(socket: WebSocket) {
        const snakes = await this.queryBus.execute<GetSnakesQuery, Snake[]>(new GetSnakesQuery());
        socket.send(
            JSON.stringify({
                event: 'snakesFetched',
                data: { snakes: snakes.map(({ id, color, tail }) => ({ id, color, tail })) },
            }),
        );
    }

    @SubscribeMessage('fruitsRequested')
    async handleFruitsRequested(socket: WebSocket) {
        const fruits = await this.queryBus.execute<GetFruitsQuery, Fruit[]>(new GetFruitsQuery());
        socket.send(
            JSON.stringify({
                event: 'fruitsFetched',
                data: { fruits: fruits.map(({ id, coords }) => ({ id, coords })) },
            }),
        );
    }
}
