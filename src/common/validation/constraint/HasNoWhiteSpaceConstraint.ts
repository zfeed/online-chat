/* eslint-disable class-methods-use-this */
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';

@ValidatorConstraint({ name: 'hasNoWhiteSpace' })
export default class HasNoWhiteSpaceConstraint
    implements ValidatorConstraintInterface {
    defaultMessage(validationArguments: ValidationArguments): string {
        return `${validationArguments.property} must have no white space characters`;
    }

    validate(value: string): boolean {
        return !/\s/g.test(value);
    }
}
