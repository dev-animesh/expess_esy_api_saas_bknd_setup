import CryptoJS from 'crypto-js';
import { ENC_DEC_CRYPTION_KEY } from '../config.js';
import { commonLog } from '../utils/commonConsole.js';
import { catchBlockErrorLog } from '../utils/catchblockError.js';
import { createResponse } from '../constants/createResponse.js';
import { statusCode as stCode } from '../constants/statusCode.js';

const decryptData = (data, key) => {
    return new Promise((resolve, reject) => {
        try {
            const bytes = CryptoJS.AES.decrypt(data, key);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            resolve(decryptedData);
        } catch (error) {
            commonLog(error, '', "Error Occur in Decryption");
            catchBlockErrorLog(error);
            reject(error);
        }
    });
};

const encryptData = (data, key) => {
    return new Promise((resolve, reject) => {
        try {
            const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
            resolve(encryptedData);
        } catch (error) {
            commonLog(error, '', "Error Occur in Encryption");
            catchBlockErrorLog(error);
            reject(error);
        }
    });
};

export const decryptRequest = async (req, res, next) => {
    try {
        if (req.body && typeof req.body === 'string') {
            const decryptedData = await decryptData(req.body, ENC_DEC_CRYPTION_KEY);
            req.body = JSON.parse(decryptedData);
        }
        next();
    } catch (err) {
        commonLog(err, '', "Error decrypting request");
        catchBlockErrorLog(err);
        return createResponse(res, stCode.OK, stCode.INTERNAL_SERVER_ERROR, "Internal server error", null, true);
    }
};

export const encryptResponse = async (req, res, next) => {
    try {
        const originalSend = res.send;
        res.send = async function (body) {
            try {
                if (typeof body === 'object') {
                    body = JSON.stringify(body);
                }
                const encryptedData = await encryptData(body, ENC_DEC_CRYPTION_KEY);
                originalSend.call(this, encryptedData);
            } catch (err) {
                commonLog(err, '', 'Error encrypting response');
                catchBlockErrorLog(err);
                return createResponse(res, stCode.OK, stCode.INTERNAL_SERVER_ERROR, "Internal server error", null, true);
                // res.status(500).json({ error: 'Error processing response' });
            }
        };
        next();
    } catch (err) {
        commonLog(err, '', 'Error setting up response encryption');
        catchBlockErrorLog(err);
        return createResponse(res, stCode.OK, stCode.INTERNAL_SERVER_ERROR, "Internal server error", null, true);
        // res.status(500).json({ error: 'Error processing response' });
    }
};
