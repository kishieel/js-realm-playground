import { Injectable } from '@nestjs/common';
import { Snake } from '../models/snake.model';
import { SnakeNotFoundError } from '../errors/snake-not-found.error';

@Injectable()
export class SnakesRepository {
    private readonly db: Map<string, Snake> = new Map();

    async findById(id: string): Promise<Snake> {
        if (!this.db.has(id)) {
            throw new SnakeNotFoundError();
        }

        return this.db.get(id);
    }

    async findAll(): Promise<Snake[]> {
        return Array.from(this.db.values());
    }

    async save(snake: Snake) {
        this.db.set(snake.id, snake);
        return snake;
    }

    async deleteById(id: string) {
        this.db.delete(id);
    }
}
