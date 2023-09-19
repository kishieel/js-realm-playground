export interface SendMessageDto {
    content: string;
    replyToId?: string;
}

export interface EditMessageDto {
    messageId: string;
    content: string;
}

export interface DeleteMessageDto {
    messageId: string;
}

export interface ClientToServerEvents {
    messageSent: (data: SendMessageDto) => void;
    messageEdited: (data: EditMessageDto) => void;
    messageDeleted: (data: DeleteMessageDto) => void;
}
