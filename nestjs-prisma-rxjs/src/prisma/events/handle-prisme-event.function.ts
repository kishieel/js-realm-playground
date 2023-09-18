import { PrismaEvents } from './prisma-events.enum';
import { getPrismaEventHandlers } from './get-prisma-event-handlers.function';

export function handlePrismaEvent(target: any, event: PrismaEvents, data: unknown) {
    const handlers = getPrismaEventHandlers(target, event);
    handlers.forEach((handler) => handler.call(target, data));
}
