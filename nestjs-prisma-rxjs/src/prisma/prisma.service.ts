import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Subject } from 'rxjs';
import { PrismaEvents } from './events';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private subject = new Subject<{ event: PrismaEvents; data: unknown }>();

    async onModuleInit() {
        Object.assign(
            this,
            this.$extends({
                query: {
                    document: {
                        create: async ({ args, query }) => {
                            const result = await query(args);
                            await this.publishEvent(PrismaEvents.DOCUMENT_CREATED, result);
                            return result;
                        },
                        update: async ({ args, query }) => {
                            const result = await query(args);
                            await this.publishEvent(PrismaEvents.DOCUMENT_UPDATED, result);
                            return result;
                        },
                    },
                },
            }),
        );
        await this.$connect();
    }

    publishEvent(event: PrismaEvents, data: unknown) {
        this.subject.next({ event, data });
    }

    getSubject$() {
        return this.subject.asObservable();
    }
}
