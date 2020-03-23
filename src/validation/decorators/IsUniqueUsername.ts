import { registerDecorator, ValidationOptions } from 'class-validator';
import IsUniqueUsernameConstraint from '../constraint/IsUniqueUsernameConstraint';

export default function IsUniqueUsername(
    validationOptions?: ValidationOptions
) {
    return (target: object, propertyName: string): void => {
        registerDecorator({
            propertyName,
            target: target.constructor,
            options: validationOptions,
            validator: IsUniqueUsernameConstraint
        });
    };
}
