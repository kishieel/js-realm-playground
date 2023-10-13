import { EventType } from '@lib/consts/event-type.enum';
import { UserCreatedPayload } from '@lib/payloads/user-created.payload';
import { UserUpdatedPayload } from '@lib/payloads/user-updated.payload';
import { UserDeletedPayload } from '@lib/payloads/user-deleted.payload';
import { RpcType } from '@lib/consts/rpc-type.enum';
import { HandlePaymentPayload } from '@lib/payloads/handle-payment.payload';
import { DecodeJwtPayload } from '@lib/payloads/decode-jwt.payload';

export type RpcPayloadMap = {
    [RpcType.HandlePayment]: HandlePaymentPayload;
    [RpcType.DecodeJwt]: DecodeJwtPayload;
};
