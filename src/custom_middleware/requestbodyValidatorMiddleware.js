import validateRequestBody from "../utils/reqbodyvalidator.js";
import { createResponse } from "../constants/createResponse.js";
import { statusCode as stCode } from "../constants/statusCode.js";

export const requestBodyValidator = (schema) => {
    return (req, res, next) => {
        if (validateRequestBody(schema, req.body)) {
            next();
        } else {
            return createResponse(res, stCode.OK, stCode.BAD_REQUEST, "Invalid request body", null, true)
        }
    };
}
