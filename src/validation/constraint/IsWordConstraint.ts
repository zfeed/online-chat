/* eslint-disable class-methods-use-this */
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';

@ValidatorConstraint({ name: 'isWord' })
export default class IsWordConstraint implements ValidatorConstraintInterface {
    defaultMessage(validationArguments: ValidationArguments): string {
        return `${validationArguments.property} must match the characters [a-zA-Z0-9_] range`;
    }

    validate(value: string): boolean {
        return /^\w+$/.test(value);
    }
}
