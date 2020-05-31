import { registerDecorator, ValidationOptions } from 'class-validator';
import NotFullyWhiteSpaceConstraint from '../constraint/NotFullyWhiteSpaceConstraint';

export default function NotFullyWhiteSpace(
    validationOptions?: ValidationOptions
) {
    return (target: object, propertyName: string): void => {
        registerDecorator({
            propertyName,
            target: target.constructor,
            options: validationOptions,
            validator: NotFullyWhiteSpaceConstraint
        });
    };
}
