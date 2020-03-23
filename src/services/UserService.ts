import { getRepository } from 'typeorm';
import { escape } from 'sqlstring';
import bcrypt from 'bcrypt';
import User from '../entity/User';

export default class UserService {
    static async createOneUser({
        username,
        password
    }: {
        username: string;
        password: string;
    }): Promise<{
        id: number;
        username: string;
        createdAt: Date;
    }> {
        const user = new User();

        user.username = username;
        user.password = password;

        const userRepository = getRepository(User);

        const savedUser = await userRepository.save(user);

        const { id, createdAt } = savedUser;

        return {
            id,
            username,
            createdAt
        };
    }

    static async getUserByUsernameAndPassword({
        username,
        password
    }: {
        username: string;
        password: string;
    }): Promise<User | null> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ username });

        if (!user) {
            return null;
        }

        const hash = user.password;

        const isCorrectPassword = await bcrypt.compare(password, hash);

        return isCorrectPassword ? user : null;
    }

    static async setLastReadMessageId({
        userId,
        messageId
    }: {
        userId: number;
        messageId: number;
    }): Promise<void> {
        const user = new User();
        user.lastReadMessageId = messageId;

        const userRepository = getRepository(User);
        const queryBuilder = userRepository.createQueryBuilder();

        const escapedMessageId = escape(messageId);

        await queryBuilder
            .update()
            .set({
                lastReadMessageId: () =>
                    `IF(lastReadMessageId < ${escapedMessageId}, ${escapedMessageId}, lastReadMessageId)`
            })
            .where('id = :id', { id: userId })
            .execute();
    }
}
