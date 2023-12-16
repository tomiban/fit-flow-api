const resError = (res, statusCode, message) => {
    res.status(statusCode).json({
        error: true,
        status: "fail",
        message,
    });
};
export {resError};
