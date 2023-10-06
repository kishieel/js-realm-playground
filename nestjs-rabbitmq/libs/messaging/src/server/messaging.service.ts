import { Inject, Injectable } from '@nestjs/common';
import { MessagingOptions } from '@app/messaging/server/messaging.interfaces';
import { MessagingOptionsToken } from '@app/messaging/server/messaging.consts';
import { MessagingClient } from '@app/messaging';
import { EventType } from '@app/messaging/events/event-type.enum';
import { EventContent } from '@app/messaging/events/event-content.type';
import { Observable } from 'rxjs';
import { RpcType } from '@app/messaging/rpcs/rpc-type.enum';
import { RpcRequestContent, RpcResponseContent } from '@app/messaging/rpcs/rpc-content.type';

@Injectable()
export class MessagingService {
    private readonly client: MessagingClient;

    constructor(
        @Inject(MessagingOptionsToken)
        private readonly options: MessagingOptions,
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
