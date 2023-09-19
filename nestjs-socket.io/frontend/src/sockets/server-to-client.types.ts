export interface MessageUpsertedDto {
    id: string;
    content: string;
    replyToId?: string;
    sentAt: Date;
    sentById: string;
}

export interface ParticipantJoinedDto {
    id: string;
    nickname: string;
}

export interface ParticipantLeftDto {
    participantId: string;
}

export interface ExceptionDto {
    message?: string;
    code?: string;
}

export interface InitDto {
    messages: Array<{
        id: string;
        content: string;
        replyToId?: string;
        sentAt: Date;
        sentById: string;
    }>;
    participants: Array<{
        id: string;
        nickname: string;
    }>;
}


export interface ServerToClientEvents {
    participantJoined: (data: ParticipantJoinedDto) => void;
    participantLeft: (data: ParticipantLeftDto) => void;
    messageUpserted: (data: MessageUpsertedDto) => void;
    exception: (data: ExceptionDto) => void;
    init: (data: InitDto) => void;
}
