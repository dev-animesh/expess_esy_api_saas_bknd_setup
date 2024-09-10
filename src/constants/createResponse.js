export const createResponse = (res, statusNet = 200, status = 200, message = '', data = null, error = false, extras = {}) => {
    return res.status(statusNet).json({
        status,
        message,
        response: data,
        error,
        extras
    });
};


// /--------- USE ----------------
// return createResponse(res, status, message, data, false);
