export class InitDto {
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
