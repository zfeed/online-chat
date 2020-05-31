import { registerDecorator, ValidationOptions } from 'class-validator';
import HasNoWhiteSpaceConstraint from '../constraint/HasNoWhiteSpaceConstraint';

export default function HasNoWhiteSpace(validationOptions?: ValidationOptions) {
    return (target: object, propertyName: string): void => {
        registerDecorator({
            propertyName,
            target: target.constructor,
            options: validationOptions,
            validator: HasNoWhiteSpaceConstraint
        });
    };
}
