export  class HttpError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message); // (1)
        this.status = status; // (2)
        Object.setPrototypeOf(this, HttpError.prototype); // (3)
    }
}