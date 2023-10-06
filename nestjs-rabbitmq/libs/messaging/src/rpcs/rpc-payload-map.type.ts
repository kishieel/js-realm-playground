import { RpcType } from './rpc-type.enum';
import { GetUserPayload } from '@app/messaging/rpcs/payloads/get-user.payload';
import { SendMailPayload } from '@app/messaging/rpcs/payloads/send-mail.payload';

export type RpcPayloadMap = {
    [RpcType.GetUser]: GetUserPayload;
    [RpcType.SendMail]: SendMailPayload;
};
