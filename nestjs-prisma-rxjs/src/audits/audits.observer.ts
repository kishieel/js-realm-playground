import { Subscription } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { Controller, OnModuleInit } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { Prisma } from '@prisma/client';
import { handlePrismaEvent, HandlePrismaEvent, PrismaEvents } from '../prisma/events';

@Controller()
export class AuditsObserver implements OnModuleInit {
    private prismaEventsSubscription: Subscription;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly auditsService: AuditsService,
    ) {}

    async onModuleInit() {
        this.prismaEventsSubscription = this.prismaService.getSubject$().subscribe({
            next: ({ event, data }) => handlePrismaEvent(this, event, data),
        });
    }

    @HandlePrismaEvent(PrismaEvents.DOCUMENT_CREATED)
    async documentCreated(document: Prisma.DocumentGetPayload<true>) {
        await this.auditsService.createAudit({
            documentUuid: document.uuid,
            description: 'Document created',
        });
    }

    @HandlePrismaEvent(PrismaEvents.DOCUMENT_UPDATED)
    async documentUpdated(document: Prisma.DocumentGetPayload<true>) {
        await this.auditsService.createAudit({
            documentUuid: document.uuid,
            description: 'Document updated',
        });
    }
}
