import { Context, Next } from 'koa';
import { validate } from '../../validation';
import { UpdateLastUnreadMessageIdRequest } from '../../api';

export default async function checkUpdateLastUnreadMessageIdRequest(
    ctx: Context,
    next: Next
): Promise<void> {
    const { id }: { id: number } = ctx.request.body;

    const requestData = new UpdateLastUnreadMessageIdRequest(id);

    const errors = await validate(requestData);

    if (errors.length > 0) {
        ctx.status = 400;
        ctx.body = errors;

        return;
    }

    ctx.request.body = requestData;

    return next();
}
