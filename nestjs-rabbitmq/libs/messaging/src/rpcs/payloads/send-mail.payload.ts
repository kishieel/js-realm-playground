export interface SendMailPayload {
    request: { to: string[]; cc?: string[]; bcc?: string[]; subject: string; body: string };
    response: { status: boolean };
}
