import { IsPositive, Max, IsInt } from '../validation';

export default class GetAllMessagesRequest {
    @IsPositive()
    @IsInt()
    @Max(200)
    readonly limitAfter: number;

    @IsPositive()
    @IsInt()
    @Max(200)
    readonly limitBefore: number;

    @IsInt()
    readonly offsetId: number;

    constructor(limitAfter: number, limitBefore: number, offsetId: number) {
        this.limitAfter = limitAfter;
        this.limitBefore = limitBefore;
        this.offsetId = offsetId;
    }
}
