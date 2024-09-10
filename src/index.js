import express from 'express';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';
import helmet from "helmet";
import cors from 'cors';
import { xss } from 'express-xss-sanitizer';

import { CONTROLLERPATH, BACKEND_HOST } from './config.js';
import { commonLog } from './utils/commonConsole.js';
import { morganLog } from './custom_middleware/morganMiddleware.js';
import { decryptRequest, encryptResponse } from './custom_middleware/decEncCryptMiddleWare.js';
import { globalErrorHandler } from './custom_middleware/globalErrorHandleMiddleware.js';
import { modifyReqWithDateTime } from './custom_middleware/dateTimeFormarMiddleWare.js';
import { apiLimiter } from './custom_middleware/rateLimiterMiddleWare.js';

const PORT = BACKEND_HOST.PORT || 8800;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app_server = express();

// app_server.enable('trust proxy')


app_server.use(cors());
app_server.use(express.json({ limit: '50mb' }));
app_server.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app_server.use(express.json());
// app_server.use(express.urlencoded({ extended: true }));

// app_server.disable('x-powered-by');
// app_server.disable('server');

app_server.use(modifyReqWithDateTime)

// app_server.use(express.static('./src/uploads')) // For File upload
// app_server.use(express.static('./src/uploads/pdf_files')) // For File upload


// Set the views directory to point to src/views
app_server.set('views', path.join(__dirname, '/views'));

// Set the view engine to EJS
app_server.set('view engine', 'ejs');

// Serve static files from src/public
app_server.use(express.static(path.join(__dirname, '/public')));


// Set security HTTP Headers
app_server.use(helmet())

app_server.use(xss());



// app_server.use(decryptRequest);// Decrypt Req;


app_server.use(morganLog);


// Api Rate limiter
app_server.use('/api', apiLimiter)





//------------ Dynamic API route -------------
// fs.readdir(controllerPath, (err, files) => {
//     if(err){
//         // util.loggs("---Filereader error-->",err)
//     } else {
//         files.forEach(file => {
//             app.use('/api' , require(controllerPath+file));
//         });
//     }
// });

fs.readdir(CONTROLLERPATH, async (err, files) => {
    if (err) {
        console.error("Error reading controller directory:", err);
    } else {
        for (const file of files) {
            try {
                const filePath = pathToFileURL(path.join(CONTROLLERPATH, file)).href;
                // console.log('Importing file:', filePath);  // Add this to see which files are being imported
                const module = await import(filePath);

                app_server.use('/api', module.default || module);
            } catch (importErr) {
                console.error(`Error importing ${file}:`, importErr);
            }
        }
    }
});


//------------ Dynamic API route -------------


// app_server.use(encryptResponse); //Encrypt res;


// Global error handling middleware (must be after routes and other middleware)
// app_server.use(globalErrorHandler);




app_server.listen(PORT, (err, data) => {
    commonLog(BACKEND_HOST.IP_HOST, "info",)
})