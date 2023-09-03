import { NotesService } from './notes.service';
import { NotesDao } from './notes.dao';
import { AuditsService } from '../audits/audits.service';
import { PaymentsService } from '../payments/payments.service';
import { TestBed } from '@automock/jest';
import { CreateNoteDto } from './dto/create-note.dto';
import { NOTES_AUDIT_MESSAGES, NOTES_CONTEXT } from './notes.consts';
import { Note } from './entities/note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';
import { now } from '../utils/now';

describe(NotesService.name, () => {
    let notesService: NotesService;
    let notesDao: jest.Mocked<NotesDao>;
    let auditsService: jest.Mocked<AuditsService>;
    let paymentsService: jest.Mocked<PaymentsService>;

    beforeAll(() => {
        const { unit, unitRef } = TestBed.create(NotesService)
            .mock(NotesDao)
            .using({
                create: jest.fn(),
                update: jest.fn(),
                remove: jest.fn(),
                findOne: jest.fn(),
                findAll: jest.fn(),
            })
            .mock(AuditsService)
            .using({ addEntry: jest.fn() })
            .mock(PaymentsService)
            .using({ chargeAccount: jest.fn() })
            .compile();

        notesService = unit;
        notesDao = unitRef.get(NotesDao);
        auditsService = unitRef.get(AuditsService);
        paymentsService = unitRef.get(PaymentsService);
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe(NotesService.prototype.create.name, () => {
        const createNoteDto: CreateNoteDto = {
            text: 'New note',
            color: '#ff0000',
            dueTo: now(),
        };

        it('should pass dto to dao', () => {
            notesService.create(createNoteDto);
            expect(notesDao.create).toBeCalledTimes(1);
            expect(notesDao.create).toBeCalledWith(createNoteDto);
        });

        it('should add audit entry', () => {
            notesService.create(createNoteDto);
            expect(auditsService.addEntry).toBeCalledTimes(1);
            expect(auditsService.addEntry).toBeCalledWith({
                context: NOTES_CONTEXT,
                message: NOTES_AUDIT_MESSAGES.noteCreated(),
                createAt: expect.any(Date),
            });
        });

        it('should charge for new note', () => {
            notesService.create(createNoteDto);
            expect(paymentsService.chargeAccount).toBeCalledTimes(1);
            expect(paymentsService.chargeAccount).toBeCalledWith(50);
        });

        it('should return created note', () => {
            notesDao.create.mockReturnValueOnce({ id: 1, ...createNoteDto });
            const note = notesService.create(createNoteDto);
            expect(note).toEqual({ id: 1, ...createNoteDto });
        });
    });

    describe(NotesService.prototype.update.name, () => {
        const updateNoteDto: Required<UpdateNoteDto> = {
            text: 'Note to update',
            color: '#ff0000',
            dueTo: now(),
        };

        it('should pass id and dto to dao', () => {
            notesService.update(1, updateNoteDto);
            expect(notesDao.update).toBeCalledTimes(1);
            expect(notesDao.update).toBeCalledWith(1, updateNoteDto);
        });

        it('should add audit entry', () => {
            notesService.update(1, updateNoteDto);
            expect(auditsService.addEntry).toBeCalledTimes(1);
            expect(auditsService.addEntry).toBeCalledWith({
                context: NOTES_CONTEXT,
                message: NOTES_AUDIT_MESSAGES.noteUpdated(1),
                createAt: expect.any(Date),
            });
        });

        it('should return updated note', () => {
            notesDao.update.mockReturnValueOnce({ id: 1, ...updateNoteDto });
            const note = notesService.update(1, updateNoteDto);
            expect(note).toEqual({ id: 1, ...updateNoteDto });
        });
    });

    describe(NotesService.prototype.remove.name, () => {
        it('should pass id to dao', () => {
            notesService.remove(1);
            expect(notesDao.remove).toBeCalledTimes(1);
            expect(notesDao.remove).toBeCalledWith(1);
        });

        it('should add audit entry', () => {
            notesDao.remove.mockReturnValueOnce(true);
            notesService.remove(1);
            expect(auditsService.addEntry).toBeCalledTimes(1);
            expect(auditsService.addEntry).toBeCalledWith({
                context: NOTES_CONTEXT,
                message: NOTES_AUDIT_MESSAGES.noteRemoved(1),
                createAt: expect.any(Date),
            });
        });
    });

    describe(NotesService.prototype.findAll.name, () => {
        const notes: Note[] = [
            { id: 1, text: 'Some note', color: '#00ff00', dueTo: now() },
            { id: 2, text: 'Other note', color: '#ff00ff', dueTo: now() },
        ];

        it('should fetch records from dao', () => {
            notesDao.findAll.mockReturnValueOnce(notes);
            expect(notesService.findAll()).toEqual(notes);
            expect(notesDao.findAll).toBeCalledTimes(1);
            expect(notesDao.findAll).toBeCalledWith();
        });
    });

    describe(NotesService.prototype.findOne.name, () => {
        const note: Note = {
            id: 1,
            text: 'Some note',
            color: '#00ff00',
            dueTo: now(),
        };

        it('should fetch record from dao', () => {
            notesDao.findOne.mockReturnValueOnce(note);
            expect(notesService.findOne(1)).toEqual(note);
            expect(notesDao.findOne).toBeCalledTimes(1);
            expect(notesDao.findOne).toBeCalledWith(1);
        });
    });
});
