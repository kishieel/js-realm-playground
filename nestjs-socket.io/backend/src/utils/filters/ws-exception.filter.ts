import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { TypedSocket } from '../../messaging/messaging.interface';

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: WsException | HttpException, host: ArgumentsHost) {
        const ctx = host.switchToWs();
        const socket = ctx.getClient() as TypedSocket;
        const error = exception instanceof WsException ? exception.getError() : exception.getResponse();
        const details = error instanceof Object ? { code: 'UNKNOWN', ...error } : { message: error, code: 'UNKNOWN' };

        socket.emit('exception', details);
    }
}
