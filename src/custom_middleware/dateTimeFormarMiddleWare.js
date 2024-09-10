import { getCurrentDateTimeForDB } from "../utils/customDateTime.js";

export const modifyReqWithDateTime = async (req, res, next) => {
    try {
        req.body.currentDateTime = getCurrentDateTimeForDB();
        next();
    } catch (err) {
        console.log("-------_Date time middleware error-->", err);
        next();
    }
}