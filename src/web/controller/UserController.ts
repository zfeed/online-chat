import { Context } from 'koa';
import { UserService } from '../../core/services';
import { CreateUserRequest, UpdateLastUnreadMessageIdRequest } from '../api';
import NoSessionError from '../error/NoSessionError';

export default class UserController {
    static async createOne(ctx: Context): Promise<void> {
        const { username, password }: CreateUserRequest = ctx.request.body;

        const data = await UserService.createOneUser({
            username,
            password
        });

        const responseBody = {
            id: data.id,
            username: data.username,
            createdAt: Math.floor(Number(data.createdAt) / 1000)
        };

        ctx.status = 201;
        ctx.body = responseBody;
    }

    static async setLastReadMessageId(ctx: Context): Promise<void> {
        const {
            id: messageId
        }: UpdateLastUnreadMessageIdRequest = ctx.request.body;

        if (!ctx.session) {
            throw new NoSessionError();
        }

        const userId = ctx.session.user.id;

        await UserService.setLastReadMessageId({
            userId,
            messageId
        });

        ctx.status = 200;
    }
}
