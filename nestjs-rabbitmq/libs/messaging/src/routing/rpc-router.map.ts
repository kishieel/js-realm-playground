import { RpcType } from '@app/messaging/rpcs/rpc-type.enum';
import { Queue } from '@app/messaging/topology/queue.enum';

const rpcRouter = new Map<RpcType, Queue>();

rpcRouter.set(RpcType.GetUser, Queue.Users);

rpcRouter.set(RpcType.SendMail, Queue.Mailing);

export { rpcRouter };
