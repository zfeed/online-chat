import { Context, Next } from 'koa';
import { validate } from '../../validation';
import { SendMessageRequest } from '../../api';

export default async function checkSendMessageRequest(
    ctx: Context,
    next: Next
): Promise<void> {
    const {
        text
    }: {
        text: string;
    } = ctx.request.body;

    const requestData = new SendMessageRequest(text);

    const errors = await validate(requestData);

    if (errors.length > 0) {
        ctx.status = 400;
        ctx.body = errors;

        return;
    }

    ctx.request.body = requestData;

    return next();
}
