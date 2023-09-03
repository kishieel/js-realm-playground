import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesDao } from './notes.dao';

@Module({
    controllers: [NotesController],
    providers: [NotesService, NotesDao],
})
export class NotesModule {}
