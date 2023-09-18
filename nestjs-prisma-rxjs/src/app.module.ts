import { Module } from '@nestjs/common';
import { MailingModule } from './mailing/mailing.module';
import { AuditsModule } from './audits/audits.module';
import { DocumentsModule } from './documents/documents.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [MailingModule, AuditsModule, DocumentsModule, PrismaModule],
})
export class AppModule {
}
