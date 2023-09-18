import { PrismaEvents } from './prisma-events.enum';
import { PRISMA_EVENT_KEY } from './consts';

export function getPrismaEventHandlers(target: any, event: PrismaEvents) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(target));
    const handlers: { (data: unknown): void }[] = [];

    for (const method of methods) {
        const metadata = Reflect.getMetadata(PRISMA_EVENT_KEY, Object.getPrototypeOf(target)[method]);
        if (metadata === event) {
            handlers.push(Object.getPrototypeOf(target)[method]);
        }
    }

    return handlers;
}
