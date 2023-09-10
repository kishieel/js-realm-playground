// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as WebSocket from 'ws';

declare module 'ws' {
    interface WebSocket {
        metadata: Record<string, any>;
    }
}
