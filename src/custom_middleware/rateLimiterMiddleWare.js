import { createResponse } from "../constants/createResponse.js";
import rateLimit from "express-rate-limit";


// Limit Request for same api
export const apiLimiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    handler: (req, res) => {
        // res.status(429).json({
        //     status: "error",
        //     code: 429,
        //     message: "Too many requests from this IP, please try again after an hour.",
        //     retryAfter: "1 hour" // Optional: Can include details like retry time
        // });
        createResponse(res, 200, 429, "Too many requests from this IP, please try again after an hour.", null, true, { retryAfter: '1 hour' })
    }
})
