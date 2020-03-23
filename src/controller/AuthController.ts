import { Context } from 'koa';
import { UserService } from '../services';
import NoSessionError from '../error/NoSessionError';

export default class AuthController {
    static async login(ctx: Context): Promise<void> {
        if (!ctx.session) {
            throw new NoSessionError();
        }

        const {
            username,
            password
        }: {
            username: string;
            password: string;
        } = ctx.request.body;

        const user = await UserService.getUserByUsernameAndPassword({
            username,
            password
        });

        if (user) {
            const data = {
                id: user.id,
                username: user.username,
                createdAt: Math.floor(Number(user.createdAt) / 1000)
            };

            ctx.session.user = data;

            ctx.status = 200;
            ctx.body = data;

            return;
        }

        ctx.status = 401;
    }

    static async logout(ctx: Context): Promise<void> {
        ctx.session = null;

        ctx.status = 200;
    }
}
