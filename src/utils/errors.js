class ApiError extends Error {
    constructor(status = 400, message) {
        super(message);
        this.statusCode = status;
    }
}

export {ApiError};
