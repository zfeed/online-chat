export default class NoSessionError extends Error {
    constructor() {
        super(`ctx.session can't be unset for this route`);
    }
}
