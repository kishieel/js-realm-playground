import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents } from './server-to-client.types';
import { ClientToServerEvents } from './client-to-server.types';

const URL = 'https://app.localhost';

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const socket: TypedSocket = io(URL, {
    autoConnect: false,
    path: '/api/socket.io',
});
