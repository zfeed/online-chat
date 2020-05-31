import { IsMessageIdExists, IsInt } from '../../common/validation';

export default class UpdateLastUnreadMessageIdRequest {
    @IsMessageIdExists()
    @IsInt()
    readonly id!: number;

    constructor(id: number) {
        this.id = id;
    }
}
