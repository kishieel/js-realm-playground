import { Server, Socket } from 'socket.io';
import { ParticipantJoinedDto } from './dto/participant-joined.dto';
import { ParticipantLeftDto } from './dto/participant-left.dto';
import { MessageUpsertedDto } from './dto/message-upserted.dto';
import { ExceptionDto } from './dto/exception.dto';
import { InitDto } from './dto/init.dto';

interface ServerToClientEvents {
    init: (data: InitDto) => void;
    participantJoined: (data: ParticipantJoinedDto) => void;
    participantLeft: (data: ParticipantLeftDto) => void;
    messageUpserted: (data: MessageUpsertedDto) => void;
    exception: (data: ExceptionDto) => void;
}

export type TypedServer = Server<unknown, ServerToClientEvents>;
export type TypedSocket = Socket<unknown, ServerToClientEvents>;
