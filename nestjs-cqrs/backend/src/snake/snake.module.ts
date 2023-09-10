import { Module } from '@nestjs/common';
import { SnakeGateway } from './snake.gateway';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { SnakesRepository } from './repositories/snakes.repository';
import { FruitsRepository } from './repositories/fruits.repository';
import { SnakeEngine } from './snake.engine';
import { WsService } from './ws.service';
import { QueryHandlers } from './queries/handlers';

@Module({
    imports: [CqrsModule],
    providers: [
        WsService,
        SnakeEngine,
        SnakeGateway,
        SnakesRepository,
        FruitsRepository,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
})
export class SnakeModule {}
