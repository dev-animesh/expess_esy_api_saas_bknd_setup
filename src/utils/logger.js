import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
        return `${level}| ${message}`;
    })
);

// Custom format to remove the level field for file transport
const removeLevelForFile = format((info) => {
    const { level, ...rest } = info;
    return rest;
})();

// Create a Winston logger
export const logger = createLogger({
    level: "info",
    transports: [
        new transports.Console({
            format: combine(
                colorize(),
                timestamp(),
                consoleLogFormat
            ),
        }),
        new transports.File({
            filename: 'src/serverlogs/server.log',
            format: combine(
                removeLevelForFile,
                timestamp(),
                json()
            ),
        }),
    ],
});

export const basic_LOG = createLogger({
    level: "info",
    format: combine(colorize(), timestamp(), consoleLogFormat),
    transports: [
        new transports.Console(),
    ],
});