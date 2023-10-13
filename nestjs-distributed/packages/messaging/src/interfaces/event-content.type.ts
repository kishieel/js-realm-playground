import { EventType } from '@lib/consts/event-type.enum';
import { EventPayloadMap } from '@lib/consts/event-payload-map.type';

export type EventContent<T extends EventType> = EventPayloadMap[T];
