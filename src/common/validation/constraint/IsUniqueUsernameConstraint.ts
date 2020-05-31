/* eslint-disable class-methods-use-this */
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import { getRepository } from 'typeorm';
import User from '../../../core/entity/User';

@ValidatorConstraint({ name: 'isUniqueUsername', async: true })
export default class IsUniqueUsernameConstraint
    implements ValidatorConstraintInterface {
    defaultMessage(validationArguments: ValidationArguments): string {
        return `${validationArguments.property} already exists`;
    }

    async validate(value: string): Promise<boolean> {
        const userRepository = getRepository(User);
        const isUsernameExists = await userRepository.findOne({
            username: value
        });

        return !isUsernameExists;
    }
}
