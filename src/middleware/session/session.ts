import session from 'koa-session';
import Koa from 'koa';

const sessionConfig = {
    key: 'koa:sess',
    maxAge: 604800000, // 7 days
    signed: false
};

export default (app: Koa): Koa.Middleware => session(sessionConfig, app);
