export type UserUpdatedPayload = {
    uuid: string;
    username?: string;
    password?: string;
    roleUuid?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
