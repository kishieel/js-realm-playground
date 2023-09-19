import { Module } from '@nestjs/common';
import { ParticipantsRepository } from './participants.repository';

@Module({
    providers: [ParticipantsRepository],
    exports: [ParticipantsRepository],
})
export class ParticipantsModule {}
