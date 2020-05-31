import { Context, Next } from 'koa';

export default async function isNotAuthenticated(
    ctx: Context,
    next: Next
): Promise<void> {
    if (ctx?.session?.user) {
        ctx.status = 200;
        return;
    }

    return next();
}
