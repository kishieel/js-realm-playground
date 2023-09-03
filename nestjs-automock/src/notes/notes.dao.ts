import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NoteNotFound } from './notes.errors';

@Injectable()
export class NotesDao {
    private readonly data: Note[] = [];

    create(createNoteDto: CreateNoteDto) {
        const nextId = Math.max(0, ...this.data.map(({ id }) => id)) + 1;
        const note: Note = { id: nextId, ...createNoteDto };
        this.data.push(note);

        return note;
    }

    findAll() {
        return this.data;
    }

    findOne(id: number) {
        const note = this.data.find((v) => v.id === id);
        if (!note) throw new NoteNotFound();

        return note;
    }

    update(id: number, updateNoteDto: UpdateNoteDto) {
        const noteIndex = this.data.findIndex((v) => v.id === id);
        if (!noteIndex) throw new NoteNotFound();
        this.data[noteIndex] = { ...this.data[noteIndex], ...updateNoteDto };

        return this.data[noteIndex];
    }

    remove(id: number) {
        const noteIndex = this.data.findIndex((v) => v.id === id);
        const isRemoved = noteIndex !== -1;
        if (isRemoved) this.data.splice(noteIndex);

        return isRemoved;
    }
}
