import { Injectable } from '@nestjs/common';
import { Snake } from '../models/snake.model';
import { SnakeNotFoundError } from '../errors/snake-not-found.error';
import { Fruit } from '../models/fruit.model';
import { FruitNotFoundError } from '../errors/fruit-not-found.error';

@Injectable()
export class FruitsRepository {
    private readonly db: Fruit[] = [];
    private readonly dbIndexedById: Map<string, Fruit> = new Map();

    async findById(id: string): Promise<Fruit> {
        if (!this.dbIndexedById.has(id)) {
            throw new FruitNotFoundError();
        }

        return this.dbIndexedById.get(id);
    }

    async findAll(): Promise<Fruit[]> {
        return this.db;
    }
}
