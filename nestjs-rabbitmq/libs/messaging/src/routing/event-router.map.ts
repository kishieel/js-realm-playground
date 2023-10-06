import { Queue } from '@app/messaging/topology/queue.enum';
import { EventType } from '@app/messaging/events/event-type.enum';

const eventRouter = new Map<EventType, Queue[]>();

eventRouter.set(EventType.UserCreated, [Queue.Billing, Queue.Mailing]);

eventRouter.set(EventType.UserUpdated, [Queue.Billing, Queue.Mailing]);

eventRouter.set(EventType.UserDeleted, [Queue.Billing, Queue.Mailing]);

eventRouter.set(EventType.PaymentCharged, [Queue.Mailing]);

export { eventRouter };
