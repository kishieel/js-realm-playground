import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { concat, delay, mergeMap, Observable, of } from 'rxjs';
import { FruitEatenEvent } from '../events/triggers/fruit-eaten.event';
import { DeleteFruitCommand } from '../commands/triggers/delete-fruit.command';
import { EnlargeSnakeCommand } from '../commands/triggers/enlarge-snake.command';
import { SpawnFruitCommand } from '../commands/triggers/spawn-fruit.command';

@Injectable()
export class FruitSagas {
    @Saga()
    fruitEaten = (event$: Observable<any>) => {
        return event$.pipe(
            ofType(FruitEatenEvent),
            mergeMap((event) => {
                const { fruitId, snakeId } = event;
                return concat(
                    of(new DeleteFruitCommand(fruitId)),
                    of(new EnlargeSnakeCommand(snakeId)),
                    of(new SpawnFruitCommand()).pipe(delay(1000))
                )
            }),
        );
    };
}
