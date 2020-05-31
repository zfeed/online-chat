import Router from 'koa-router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import {
    UserController,
    AuthController,
    MessageController
} from './controller';

import {
    checkSendMessageRequest,
    checkUpdateLastUnreadMessageIdRequest,
    checkCreateUserRequest,
    isAuthenticated,
    session
} from './middleware';

const router = new Router<Koa.DefaultState, Koa.Context>();

export default (app: Koa): Router => {
    router.use(session(app));

    router.use(bodyParser());

    router.post('/login', AuthController.login);
    router.post('/logout', AuthController.logout);

    router.post('/register', checkCreateUserRequest, UserController.createOne);

    router.post(
        '/setLastUnreadMessage',
        isAuthenticated,
        checkUpdateLastUnreadMessageIdRequest,
        UserController.setLastReadMessageId
    );

    router.post(
        '/sendMessage',
        isAuthenticated,
        checkSendMessageRequest,
        MessageController.sendOne
    );

    router.post('/getAllMessages', isAuthenticated, MessageController.getAll);

    return router;
};
