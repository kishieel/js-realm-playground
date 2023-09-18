import { Subscription } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { Controller, OnModuleInit } from '@nestjs/common';
import { handlePrismaEvent, HandlePrismaEvent, PrismaEvents } from '../prisma/events';
import { MailingService } from './mailing.service';

@Controller()
export class MailingObserver implements OnModuleInit {
    private prismaEventsSubscription: Subscription;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailingService: MailingService,
    ) {}

    async onModuleInit() {
        this.prismaEventsSubscription = this.prismaService.getSubject$().subscribe({
            next: ({ event, data }) => handlePrismaEvent(this, event, data),
        });
    }

    @HandlePrismaEvent(PrismaEvents.DOCUMENT_CREATED)
    async documentCreated() {
        await this.mailingService.documentCreated();
    }

    @HandlePrismaEvent(PrismaEvents.DOCUMENT_UPDATED)
    async documentUpdated() {
        await this.mailingService.documentUpdated();
    }
}
