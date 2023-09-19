export interface IMessage {
    id: string;
    content: string;
    replyToId?: string;
    sentAt: Date;
    sentById: string;
}
