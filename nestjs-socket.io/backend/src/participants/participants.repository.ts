import { Injectable } from '@nestjs/common';
import { Participant } from './models/participant.model';

@Injectable()
export class ParticipantsRepository {
    private readonly db: Map<string, Participant> = new Map();

    save(participant: Participant) {
        this.db.set(participant.id, participant);
    }

    findById(id: string): Participant | null {
        return this.db.get(id);
    }

    findAll() {
        return Array.from(this.db.values());
    }

    deleteById(id: string) {
        this.db.delete(id);
    }
}
