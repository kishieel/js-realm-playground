export class Message {
    private _content: string;
    private _replyToId: string;
    private _sentById: string;
    private _sentAt: Date;
    private _editedAt: Date;
    private _deletedAt: Date;

    constructor(private readonly _id: string) {}

    get id() {
        return this._id;
    }

    get content() {
        return this._content;
    }

    set content(content: string) {
        this._content = content;
    }

    get replyToId() {
        return this._replyToId;
    }

    set replyToId(replyToId: string) {
        this._replyToId = replyToId;
    }

    get sentById() {
        return this._sentById;
    }

    set sentById(sentById: string) {
        this._sentById = sentById;
    }

    get sentAt() {
        return this._sentAt;
    }

    set sentAt(sentAt: Date) {
        this._sentAt = sentAt;
    }

    get editedAt() {
        return this._editedAt;
    }

    set editedAt(editedAt: Date) {
        this._editedAt = editedAt;
    }

    get deletedAt() {
        return this._deletedAt;
    }

    set deletedAt(deletedAt: Date) {
        this._deletedAt = deletedAt;
    }
}
