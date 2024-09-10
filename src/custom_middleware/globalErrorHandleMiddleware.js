import { statusCode as stCode } from "../constants/statusCode.js";
import { createResponse } from "../constants/createResponse.js";
import { DEV_STAGE } from "../config.js";


export const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    let DEV_MODE = DEV_STAGE === "STAGGING" ? 1 : 0;
    let DEV_MSG = "Some error occur";

    // Handle specific error types and status codes
    switch (err.name) {
        // case 'ValidationError':
        //     return createResponse(res, stCode.OK, stCode.BAD_REQUEST, "Bad request", null, true, DEV_MODE ? { stack: err.stack } : {});
        //     return res.status(400).json({
        //         message: 'Invalid request data. Please check your input and try again.',
        //         ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        //     });
        // case 'UnauthorizedError':
        //     return createResponse(res, stCode.OK, stCode.BAD_REQUEST, "Bad request", null, true, DEV_MODE ? { stack: err.stack } : {});
        //     return res.status(401).json({
        //         message: 'Unauthorized. Please provide valid credentials.',
        //         ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        //     });
        // case 'ForbiddenError':
        //     return res.status(403).json({
        //         message: 'Forbidden. You do not have permission to access this resource.',
        //         ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        //     });
        // case 'NotFoundError':
        //     return res.status(404).json({
        //         message: 'Resource not found.',
        //         ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        //     });
        case 'EntityTooLargeError':
            return res.status(413).json({
                message: 'Payload too large. Please reduce the size of your request and try again.',
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
            });
        // case 'ConflictError':
        //     return res.status(409).json({
        //         message: 'Conflict with the current state of the resource.',
        //         ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        //     });
        // case 'RateLimitError':
        //     return res.status(429).json({
        //         message: 'Too many requests. Please try again later.',
        //         ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        //     });
        default:
            // Handle generic or unknown errors
            return res.status(err.status || 500).json({
                message: err.message || 'Internal Server Error',
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
            });
    }
};

