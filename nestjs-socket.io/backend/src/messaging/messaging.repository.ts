import { Injectable } from '@nestjs/common';
import { Message } from './models/message.model';

@Injectable()
export class MessagingRepository {
    private readonly db: Map<string, Message> = new Map();

    save(message: Message) {
        this.db.set(message.id, message);
    }

    findById(id: string) {
        return this.db.get(id);
    }

    findAll() {
        return Array.from(this.db.values());
    }

    deleteById(id: string) {
        this.db.delete(id);
    }
}
