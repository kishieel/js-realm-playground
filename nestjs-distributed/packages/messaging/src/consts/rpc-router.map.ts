import { RpcType } from '@lib/consts/rpc-type.enum';
import { Queue } from '@lib/consts/queue.enum';

export const rpcRouter = new Map<RpcType, Queue>([
    [RpcType.DecodeJwt, Queue.Auth],
    [RpcType.HandlePayment, Queue.Billing],
]);
