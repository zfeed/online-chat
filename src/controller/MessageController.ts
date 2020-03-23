import { Context } from 'koa';
import { MessageService } from '../services';
import { SendMessageRequest, GetAllMessagesRequest } from '../api';
import NoSessionError from '../error/NoSessionError';

export default class MessageController {
    static async sendOne(ctx: Context): Promise<void> {
        const { text }: SendMessageRequest = ctx.request.body;

        if (!ctx.session) {
            throw new NoSessionError();
        }

        const fromUserId = ctx.session.user.id;

        const data = await MessageService.createMessage({
            text,
            fromUserId
        });

        const responseBody = {
            id: data.id,
            createdAt: Math.floor(Number(data.createdAt) / 1000)
        };

        ctx.status = 201;
        ctx.body = responseBody;
    }

    static async getAll(ctx: Context): Promise<void> {
        const {
            limitAfter,
            limitBefore,
            offsetId
        }: GetAllMessagesRequest = ctx.request.body;

        const result = await MessageService.getAll({
            limitAfter,
            limitBefore,
            offsetId
        });

        ctx.status = 200;
        ctx.body = result;
    }
}
