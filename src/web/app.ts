import Koa from 'koa';
import routerInitializer from './router';

const app = new Koa();

const router = routerInitializer(app);

app.use(router.routes());

export default app;
