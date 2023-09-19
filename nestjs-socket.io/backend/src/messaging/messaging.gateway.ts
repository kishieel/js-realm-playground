import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { SendMessageDto } from './dto/send-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { MessagingService } from './messaging.service';
import { TypedServer, TypedSocket } from './messaging.interface';
import { UseFilters } from '@nestjs/common';
import { WsExceptionFilter } from '../utils/filters/ws-exception.filter';

@WebSocketGateway({ cors: { origin: '*' } })
@UseFilters(WsExceptionFilter)
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: TypedServer;

    constructor(private readonly messagingService: MessagingService) {}

    handleConnection(@ConnectedSocket() socket: TypedSocket) {
        try {
            this.messagingService.onConnected(socket);
        } catch (error: any) {
            socket.emit('exception', { message: error.message, code: error.code || 'UNKNOWN' });
            socket.disconnect();
        }
    }

    handleDisconnect(@ConnectedSocket() socket: TypedSocket) {
        this.messagingService.onDisconnected(socket);
    }

    @SubscribeMessage('messageSent')
    handleMessageSent(@ConnectedSocket() socket: TypedSocket, @MessageBody() data: SendMessageDto) {
        this.messagingService.onMessageSent(socket, data);
    }

    @SubscribeMessage('messageEdited')
    handleMessageEdited(@ConnectedSocket() socket: TypedSocket, @MessageBody() data: EditMessageDto) {
        this.messagingService.onMessageEdited(socket, data);
    }

    @SubscribeMessage('messageDeleted')
    handleMessageDeleted(@ConnectedSocket() socket: TypedSocket, @MessageBody() data: DeleteMessageDto) {
        this.messagingService.onMessageDeleted(socket, data);
    }
}
