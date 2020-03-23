import { Context, Next } from 'koa';
import { validate } from '../../validation';
import { CreateUserRequest } from '../../api';

export default async function checkCreateUserRequest(
    ctx: Context,
    next: Next
): Promise<void> {
    const {
        username,
        password
    }: {
        username: string;
        password: string;
    } = ctx.request.body;

    const requestData = new CreateUserRequest(username, password);

    const errors = await validate(requestData);

    if (errors.length > 0) {
        ctx.status = 400;
        ctx.body = errors;

        return;
    }

    ctx.request.body = requestData;

    return next();
}
