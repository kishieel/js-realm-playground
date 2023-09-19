export class MessageUpsertedDto {
    id: string;
    content: string;
    replyToId?: string;
    sentAt: Date;
    sentById: string;
}
