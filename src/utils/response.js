const response = (res, statusCode, data) => {
    const responseData = {
        error: false,
        status: "success",
        data,
    };

    if (Array.isArray(data)) {
        responseData.results = data.length;
    }

    res.status(statusCode).json(responseData);
};
export {response};
