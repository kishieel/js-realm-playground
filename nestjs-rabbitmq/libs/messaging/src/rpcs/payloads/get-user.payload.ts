export interface GetUserPayload {
    request: { userUuid: string };
    response: { user: { uuid: string; } };
}
