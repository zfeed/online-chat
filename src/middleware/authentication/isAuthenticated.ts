import { Context, Next } from 'koa';

export default async function isAuthenticated(
    ctx: Context,
    next: Next
): Promise<void> {
    if (ctx?.session?.user) {
        return next();
    }

    ctx.status = 401;
}
