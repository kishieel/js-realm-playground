import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessagingClient } from '@lib/strategy/messaging.client';
import { MessagingOptionsToken } from '@lib/strategy/messaging.consts';
import { MessagingClientOptions } from '@lib/strategy/messaging.options';
import { RpcType } from '@lib/consts/rpc-type.enum';
import { EventType } from '@lib/consts/event-type.enum';
import { RpcRequestContent } from '@lib/interfaces/rpc-request-content.type';
import { RpcResponseContent } from '@lib/interfaces/rpc-response-content.type';
import { EventContent } from '@lib/interfaces/event-content.type';

@Injectable()
export class MessagingService {
    private readonly client: MessagingClient;

    constructor(
        @Inject(MessagingOptionsToken)
        private readonly options: MessagingClientOptions,
    ) {
        this.client = new MessagingClient(options);
    }

    send<T extends RpcType>(pattern: T, data: RpcRequestContent<T>): Observable<RpcResponseContent<T>> {
        return this.client.send(pattern, data);
    }

    emit<T extends EventType>(pattern: T, data: EventContent<T>) {
        this.client.emit(pattern, data);
    }
}
