import { registerDecorator, ValidationOptions } from 'class-validator';
import IsUserIdExistsConstraint from '../constraint/IsUserIdExistsConstraint';

export default function IsUserIdExists(validationOptions?: ValidationOptions) {
    return (target: object, propertyName: string): void => {
        registerDecorator({
            propertyName,
            target: target.constructor,
            options: validationOptions,
            validator: IsUserIdExistsConstraint
        });
    };
}
