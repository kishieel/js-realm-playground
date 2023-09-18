import { PRISMA_EVENT_KEY } from './consts';
import { PrismaEvents } from './prisma-events.enum';


export function HandlePrismaEvent(event: PrismaEvents) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(PRISMA_EVENT_KEY, event, descriptor.value);
    };
}
