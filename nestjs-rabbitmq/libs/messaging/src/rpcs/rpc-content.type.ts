import { RpcPayloadMap } from './rpc-payload-map.type';
import { RpcType } from './rpc-type.enum';

export type RpcRequestContent<T extends RpcType> = RpcPayloadMap[T]['request'];
export type RpcResponseContent<T extends RpcType> = RpcPayloadMap[T]['response'];
