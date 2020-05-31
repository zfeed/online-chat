import http from 'http';
import app from './app';
import { handleUpgrade } from './ws';

const server = http.createServer(app.callback());

server.on('upgrade', handleUpgrade);

export default server;
