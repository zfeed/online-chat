import { getRepository, getManager } from 'typeorm';
import { escape } from 'sqlstring';
import User from '../entity/User';
import Message from '../entity/Message';

export default class MessageService {
    static async createMessage({
        text,
        fromUserId
    }: {
        text: string;
        fromUserId: number;
    }): Promise<{
        id: number;
        createdAt: Date;
    }> {
        const fromUser = new User();
        fromUser.id = fromUserId;

        const message = new Message();
        message.text = text;
        message.fromUser = fromUser;

        const messageRepository = getRepository(Message);

        const savedMessage = await messageRepository.save(message);

        const { id, createdAt } = savedMessage;

        return {
            id,
            createdAt
        };
    }

    static async getAll({
        limitBefore,
        limitAfter,
        offsetId
    }: {
        limitBefore: number;
        limitAfter: number;
        offsetId: number;
    }): Promise<
        Array<{
            id: number;
            text: string;
            fromUserId: number;
            createdAt: Date;
        }>
    > {
        const entityManager = getManager();

        const data: Array<{
            id: number;
            text: string;
            fromUserId: number;
            createdAt: Date;
        }> = await entityManager.query(
            `
            SELECT id, text, fromUserId, createdAt FROM messages
            WHERE id = ${escape(offsetId)}
            UNION ALL
            (
                SELECT id, text, fromUserId, createdAt FROM messages
                WHERE id < ${escape(offsetId)}
                ORDER BY id DESC LIMIT ${escape(limitBefore)}
            )
            UNION ALL
            (
                SELECT id, text, fromUserId, createdAt FROM messages
                WHERE id > ${escape(offsetId)}
                ORDER BY id ASC LIMIT ${escape(limitAfter)}
            )
            ORDER BY id ASC
        `
        );

        return data;
    }
}
