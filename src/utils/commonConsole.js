import { DEV_STAGE } from "../config.js";
import { basic_LOG } from "./logger.js";
import { inspect } from 'util';

// -------------------- ALL COMMON CONSOLE LOG ----------------------------
export const commonLog = (val, type = '', logText = "------------>>") => {
    if (DEV_STAGE !== "PRODUCTION") {
        let logMessage;

        // Check if the value is an Error object
        if (val instanceof Error) {
            logMessage = {
                message: val.message,
                stack: val.stack,
                name: val.name,
                code: val.code || 'N/A',
                errno: val.errno || 'N/A',      // MySQL-specific error number
                sqlMessage: val.sqlMessage || 'N/A'  // MySQL-specific SQL message
            };
        } else {
            // logMessage = inspect(val, { depth: null, colors: true }); // `inspect` prevents circular reference errors
            logMessage = inspect(val, { depth: null, colors: false }); // `inspect` prevents circular reference errors
        }

        switch (type) {
            case 'error':
                // return basic_LOG.error(JSON.stringify(logMessage));
                return console.log(logMessage);
            case 'info':
                return basic_LOG.info(JSON.stringify(logMessage));
            case 'warn':
                return basic_LOG.warn(JSON.stringify(logMessage));
            default:
                // return basic_LOG.debug(JSON.stringify(logMessage));
                return console.log(logText, logMessage);

        }
    }
    return null;
}
