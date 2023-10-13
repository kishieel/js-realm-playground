import { RpcType } from '@lib/consts/rpc-type.enum';
import { RpcPayloadMap } from '@lib/consts/rpc-payload-map.type';

export type RpcResponseContent<T extends RpcType> = RpcPayloadMap[T]['response'];
