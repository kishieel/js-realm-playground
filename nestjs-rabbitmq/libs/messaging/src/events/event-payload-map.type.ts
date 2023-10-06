import { EventType } from './event-type.enum';
import { UserCreatedPayload } from './payloads/user-created.payload';
import { UserUpdatedPayload } from './payloads/user-updated.payload';
import { UserDeletedPayload } from './payloads/user-deleted.payload';
import { PaymentChargedPayload } from './payloads/payment-charged.payload';

export type EventPayloadMap = {
    [EventType.UserCreated]: UserCreatedPayload;
    [EventType.UserUpdated]: UserUpdatedPayload;
    [EventType.UserDeleted]: UserDeletedPayload;
    [EventType.PaymentCharged]: PaymentChargedPayload;
};
