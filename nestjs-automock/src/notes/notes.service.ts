import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesDao } from './notes.dao';
import { AuditsService } from '../audits/audits.service';
import { PaymentsService } from '../payments/payments.service';
import {
    NOTES_AUDIT_MESSAGES,
    NOTES_CHARGE,
    NOTES_CONTEXT,
} from './notes.consts';
import { now } from '../utils/now';

@Injectable()
export class NotesService {
    constructor(
        private readonly notesDao: NotesDao,
        private readonly auditService: AuditsService,
        private readonly paymentsService: PaymentsService,
    ) {}

    create(createNoteDto: CreateNoteDto) {
        const note = this.notesDao.create(createNoteDto);
        this.auditService.addEntry({
            context: NOTES_CONTEXT,
            message: NOTES_AUDIT_MESSAGES.noteCreated(),
            createAt: now(),
        });
        this.paymentsService.chargeAccount(NOTES_CHARGE);

        return note;
    }

    findAll() {
        return this.notesDao.findAll();
    }

    findOne(id: number) {
        return this.notesDao.findOne(id);
    }

    update(id: number, updateNoteDto: UpdateNoteDto) {
        const note = this.notesDao.update(id, updateNoteDto);
        this.auditService.addEntry({
            context: NOTES_CONTEXT,
            message: NOTES_AUDIT_MESSAGES.noteUpdated(id),
            createAt: now(),
        });

        return note;
    }

    remove(id: number) {
        const isRemoved = this.notesDao.remove(id);
        if (isRemoved) {
            this.auditService.addEntry({
                context: NOTES_CONTEXT,
                message: NOTES_AUDIT_MESSAGES.noteRemoved(id),
                createAt: now(),
            });
        }
    }
}
