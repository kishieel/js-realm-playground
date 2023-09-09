import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SpawnSnakeCommand } from './commands/triggers/spawn-snake.command';
import { Server, WebSocket } from 'ws';
import { OnApplicationShutdown } from '@nestjs/common';
import { SnakeService } from './snake.service';
import { Subscription } from 'rxjs';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { DeleteSnakeCommand } from './commands/triggers/delete-snake.command';

@WebSocketGateway()
export class SnakeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, OnApplicationShutdown {
    private eventSubscription: Subscription;

    @WebSocketServer()
    server: Server;

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly service: SnakeService,
    ) {}

    afterInit(server: Server): void {
        this.eventSubscription = this.service.getEventSubject$().subscribe({
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
        this.service.addEvent('spawnConfirmed', { snakeId });
    }

    async handleDisconnect(socket: WebSocket) {
        await this.commandBus.execute(new DeleteSnakeCommand(socket.metadata.snakeId));
    }

    @SubscribeMessage('directionChanged')
    handleDirectionChanged(client: any, payload: any) {
        [{ client, payload }];
        console.log(payload);
    }

    @SubscribeMessage('fruitEaten')
    handleFruitEaten(client: any, payload: any) {
        [{ client, payload }];
        console.log(payload);
    }
}
