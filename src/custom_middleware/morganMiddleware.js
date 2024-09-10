import { logger, basic_LOG } from "../utils/logger.js";
import morgan from "morgan";
import moment from "moment";
import { DEV_STAGE } from "../config.js";


// Register a custom token for date formatting
morgan.token('date', () => {
    return moment().format('DD/MMM/YYYY || H:mm:ss || [GMT]Z'); // Removed extra space before GMT
});

// Define the custom Morgan format
const morganFormat = ":remote-addr :method :url :status :response-time ms :date";

// Create a custom Morgan logging middleware
export const morganLog = morgan(morganFormat, {
    stream: {
        write: (message) => {
            // console.log(message);

            // Parse the log message to create a structured log object
            const parts = message.split(" ");
            const remoteAddr = parts[0];
            const method = parts[1];
            const apiUrl = parts[2];
            const status = parts[3];
            const responseTimeMs = parseFloat(parts[4].replace('ms', '')); // Remove 'ms' and parse to float
            const responseTimeMin = (responseTimeMs / 60000).toFixed(5); // Convert milliseconds to minutes (to 5 decimal places)
            const dateTime = parts.slice(5).join(" ").replace('ms', '').trim(); // Trim to remove any trailing whitespace or newline

            // Create a log object with the extracted details
            const logObject = {
                // remoteAddr,
                apiUrl,
                dateTime,
                method,
                status,
                responseTimeMs: `${responseTimeMs} ms`, // Response time in milliseconds
                responseTimeMin: `${responseTimeMin} min`, // Response time in minutes
                remoteAddr,
            };

            // Log the object using the custom logger
            if (DEV_STAGE === "PRODUCTION") {
                logger.info(JSON.stringify(logObject)); // Save the log file
            }
            else {
                basic_LOG.info(JSON.stringify(logObject)); // Don't save the log file
            }
        },
    },
});