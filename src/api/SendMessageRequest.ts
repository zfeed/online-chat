import { Length, NotFullyWhiteSpace } from '../validation';

export default class SendMessageRequest {
    @NotFullyWhiteSpace()
    @Length(1, 4096)
    readonly text: string;

    constructor(text: string) {
        this.text = text;
    }
}
