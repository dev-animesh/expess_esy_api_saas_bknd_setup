import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { DEV_STAGE } from '../config.js';

export const catchBlockErrorLog = (error, occurfileName = 'catchError') => {
    if (DEV_STAGE === 'PRODUCTION') {
        const logFilePath = path.join(process.cwd(), `src/serverlogs/${occurfileName}.log`);
        const logMessage = `${moment().format('DD/MMM/YYYY || H:mm:ss || [GMT]Z')} - Error: ${error.message}\n${error.stack}\n\n`;

        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Failed to write to server.log:', err);
            }
        });
    }
    return null;

};
