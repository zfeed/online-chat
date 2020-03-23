import { registerDecorator, ValidationOptions } from 'class-validator';
import IsWordConstraint from '../constraint/IsWordConstraint';

export default function IsWord(validationOptions?: ValidationOptions) {
    return (target: object, propertyName: string): void => {
        registerDecorator({
            propertyName,
            target: target.constructor,
            options: validationOptions,
            validator: IsWordConstraint
        });
    };
}
