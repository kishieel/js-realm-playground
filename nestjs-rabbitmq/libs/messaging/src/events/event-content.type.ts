import { EventPayloadMap } from "./event-payload-map.type";
import { EventType } from "./event-type.enum";

export type EventContent<T extends EventType> = EventPayloadMap[T];