import http, { IncomingMessage } from 'http';
import { Socket } from 'net';
import WebSocket from 'ws';
import app from './app';

const ws = new WebSocket.Server({ noServer: true });

export async function handleUpgrade(
    request: IncomingMessage,
    socket: Socket,
    head: Buffer
): Promise<void> {
    // fake context to init koa session
    const ctx = app.createContext(request, new http.ServerResponse(request));

    const { session } = ctx;

    if (session.store) {
        await session.initFromExternal().catch((error: Error) => {
            console.error(error);

            socket.destroy();
        });
    }

    const { user } = ctx.session;

    if (!user) {
        socket.destroy();

        return;
    }

    ws.handleUpgrade(request, socket, head, (webSocket) =>
        ws.emit('connection', webSocket, request, user)
    );
}

export default ws;
