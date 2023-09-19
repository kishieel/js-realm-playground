export class Participant {
    private _nickname: string;

    constructor(private readonly _id: string) {}

    get id() {
        return this._id;
    }

    get nickname() {
        return this._nickname;
    }

    set nickname(nickname: string) {
        this._nickname = nickname;
    }
}
