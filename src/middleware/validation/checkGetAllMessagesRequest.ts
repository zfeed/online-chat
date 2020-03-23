import { Context, Next } from 'koa';
import { validate } from '../../validation';
import { GetAllMessagesRequest } from '../../api';

export default async function checkSendMessageRequest(
    ctx: Context,
    next: Next
): Promise<void> {
    const {
        limitAfter,
        limitBefore,
        offsetId
    }: {
        limitAfter: number;
        limitBefore: number;
        offsetId: number;
    } = ctx.request.body;

    const requestData = new GetAllMessagesRequest(
        limitAfter,
        limitBefore,
        offsetId
    );

    const errors = await validate(requestData);

    if (errors.length > 0) {
        ctx.status = 400;
        ctx.body = errors;

        return;
    }

    ctx.request.body = requestData;

    return next();
}
