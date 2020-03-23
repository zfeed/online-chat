/* eslint-disable class-methods-use-this */
import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { getRepository } from 'typeorm';
import Message from '../../entity/Message';

@ValidatorConstraint({ name: 'isMessageIdExists', async: true })
export default class IsMessageIdExistsConstraint
    implements ValidatorConstraintInterface {
    defaultMessage(): string {
        return `Message id doesn't exist`;
    }

    async validate(value: string): Promise<boolean> {
        const messageRepository = getRepository(Message);

        const isMessageExists = await messageRepository.findOne(value);

        if (!isMessageExists) {
            return false;
        }

        return Boolean(isMessageExists);
    }
}
