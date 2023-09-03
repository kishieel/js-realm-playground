import { UnprocessableEntityException } from '@nestjs/common';

export class NoteNotFound extends UnprocessableEntityException {
    constructor() {
        super('Note Not Found');
    }
}
