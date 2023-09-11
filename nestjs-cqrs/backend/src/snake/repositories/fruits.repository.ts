import { Injectable } from '@nestjs/common';
import { Fruit } from '../models/fruit.model';
import { FruitNotFoundError } from '../errors/fruit-not-found.error';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { range } from '../../utils/functions/range';

@Injectable()
export class FruitsRepository {
    private readonly db: Map<string, Fruit> = new Map();

    constructor() {
        Array.from({ length: range(4, 10) }).forEach(() => {
            const fruit = new Fruit(randomStringGenerator());
            fruit.coords = { x: range(0, 48), y: range(0, 36) };
            this.db.set(fruit.id, fruit);
        });
    }

    async findById(id: string): Promise<Fruit> {
        if (!this.db.has(id)) {
            throw new FruitNotFoundError();
        }

        return this.db.get(id);
    }

    async findAll(): Promise<Fruit[]> {
        return Array.from(this.db.values());
    }

    async deleteById(id: string) {
        this.db.delete(id);
    }

    async save(fruit: Fruit) {
        this.db.set(fruit.id, fruit);
        return fruit;
    }
}
