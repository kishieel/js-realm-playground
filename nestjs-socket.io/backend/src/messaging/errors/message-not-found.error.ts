import { WsException } from '@nestjs/websockets';

export class MessageNotFoundError extends WsException {
    public readonly code = 'MESSAGE_NOT_FOUND';
}
