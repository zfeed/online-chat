/* eslint-disable class-methods-use-this */
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';

@ValidatorConstraint({ name: 'notFullyWhiteSpace' })
export default class NotFullyWhiteSpaceConstraint
    implements ValidatorConstraintInterface {
    defaultMessage(validationArguments: ValidationArguments): string {
        return `${validationArguments.property} must not contain only white space characters`;
    }

    validate(value: string): boolean {
        return !/^\s+$/.test(value);
    }
}
