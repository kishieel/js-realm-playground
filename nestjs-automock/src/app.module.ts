import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { AuditsModule } from './audits/audits.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
    imports: [NotesModule, AuditsModule, PaymentsModule],
})
export class AppModule {}
