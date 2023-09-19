import { ForbiddenException, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { MessagingRepository } from './messaging.repository';
import { ParticipantsRepository } from '../participants/participants.repository';
import { MissingNicknameError } from './errors/missing-nickname.error';
import { Participant } from '../participants/models/participant.model';
import { TypedSocket } from './messaging.interface';
import { Message } from './models/message.model';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { MessageNotFoundError } from './errors/message-not-found.error';

@Injectable()
export class MessagingService {
    constructor(
        private readonly messagingRepository: MessagingRepository,
        private readonly participantsRepository: ParticipantsRepository,
    ) {
    }

    onConnected(socket: TypedSocket) {
        const nickname = socket.handshake.query.nickname;
        if (typeof nickname !== 'string') throw new MissingNicknameError('Missing nickname');

        const participant = new Participant(socket.id);
        participant.nickname = nickname;
        this.participantsRepository.save(participant);

        socket.broadcast.emit('participantJoined', {
            id: participant.id,
            nickname: participant.nickname,
        });

        const messages = this.messagingRepository.findAll();
        const participants = this.participantsRepository.findAll();
        socket.emit('init', {
            messages: messages.map((message) => ({
                id: message.id,
                content: message.content,
                replyToId: message.replyToId,
                sentAt: message.sentAt,
                sentById: message.sentById,
            })),
            participants: participants.map((participant) => ({
                id: participant.id,
                nickname: participant.nickname,
            })),
        });
    }

    onDisconnected(socket: TypedSocket) {
        socket.broadcast.emit('participantLeft', { participantId: socket.id });
    }

    onMessageSent(socket: TypedSocket, data: SendMessageDto) {
        const message = new Message(randomStringGenerator());
        message.content = data.content;
        message.replyToId = data.replyToId;
        message.sentAt = new Date();
        message.sentById = socket.id;
        this.messagingRepository.save(message);
        this.emitMessageUpserted(socket, message);
    }

    onMessageEdited(socket: TypedSocket, data: EditMessageDto) {
        const message = this.messagingRepository.findById(data.messageId);
        if (!message) throw new MessageNotFoundError('Message not found');
        if (message.sentById !== socket.id) throw new ForbiddenException();
        message.content = data.content;
        message.editedAt = new Date();
        this.messagingRepository.save(message);
        this.emitMessageUpserted(socket, message);
    }

    onMessageDeleted(socket: TypedSocket, data: DeleteMessageDto) {
        const message = this.messagingRepository.findById(data.messageId);
        if (!message) throw new MessageNotFoundError('Message not found');
        if (message.sentById !== socket.id) throw new ForbiddenException();
        message.content = 'This message has been deleted.';
        message.deletedAt = new Date();
        this.messagingRepository.save(message);
        this.emitMessageUpserted(socket, message);
    }

    private emitMessageUpserted(socket: TypedSocket, message: Message) {
        const data = {
            id: message.id,
            content: message.content,
            replyToId: message.replyToId,
            sentAt: message.sentAt,
            sentById: message.sentById,
        };
        socket.broadcast.emit('messageUpserted', data);
        socket.emit('messageUpserted', data);
    }
}
