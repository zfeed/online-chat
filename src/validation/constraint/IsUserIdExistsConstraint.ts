/* eslint-disable class-methods-use-this */
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import { getRepository } from 'typeorm';
import User from '../../entity/User';

@ValidatorConstraint({ name: 'isUserIdExists', async: true })
export default class IsUserIdExistsConstraint
    implements ValidatorConstraintInterface {
    defaultMessage(validationArguments: ValidationArguments): string {
        return `User with id '${
            (validationArguments.value as User).id
        }' doesn't exist`;
    }

    async validate(value: User | undefined): Promise<boolean> {
        if (!value) {
            return true;
        }

        const userRepository = getRepository(User);
        const isUserExists = await userRepository.findOne({
            id: value.id
        });

        return Boolean(isUserExists);
    }
}
