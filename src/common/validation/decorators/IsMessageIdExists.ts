import { registerDecorator, ValidationOptions } from 'class-validator';
import IsMessageIdExistsConstraint from '../constraint/IsMessageIdExistsConstraint';

export default function IsMessageIdExists(
    validationOptions?: ValidationOptions
) {
    return (target: object, propertyName: string): void => {
        registerDecorator({
            propertyName,
            target: target.constructor,
            options: validationOptions,
            validator: IsMessageIdExistsConstraint
        });
    };
}
