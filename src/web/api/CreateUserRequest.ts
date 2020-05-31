import {
    Length,
    IsAscii,
    HasNoWhiteSpace,
    IsWord,
    IsUniqueUsername
} from '../../common/validation';

export default class CreateUserRequest {
    @IsUniqueUsername()
    @IsWord()
    @Length(5, 10)
    readonly username!: string;

    @HasNoWhiteSpace()
    @IsAscii()
    @Length(8, 128)
    readonly password!: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
