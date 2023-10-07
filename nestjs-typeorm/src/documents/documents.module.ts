import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './enitites/document.entity';
import { Reviewer } from './enitites/reviewer.entity';
import { DocumentsController } from './documents.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Document, Reviewer]), UsersModule],
    providers: [DocumentsService],
    controllers: [DocumentsController],
})
export class DocumentsModule {}
