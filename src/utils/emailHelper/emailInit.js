import dotenv from 'dotenv';
dotenv.config();
import nodeMailer from 'nodemailer';
import { commonLog } from '../commonConsole';
import { catchBlockErrorLog } from '../catchblockError';
import { statusCode } from '../../constants/statusCode';


export const initializeTransport = async () => {
    try {
        const transport = await nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.FROM_USER_EMAIL,
                pass: process.env.FROM_PASS_EMAIL
            }

        });
        return transport;
    } catch (err) {
        commonLog(err, '', "Error initializing transport:");
        catchBlockErrorLog(err);
        return statusCode.EMAIL_CATCH_BLK_ERROR;
    }
};


export const _sendMail = async (transport, mailOption) => {
    try {
        let data = await transport.sendMail(mailOption);
        return true;
    } catch (err) {
        catchBlockErrorLog(err);
        commonLog(err, '', "Error Sending Mail......");
        return statusCode.EMAIL_CATCH_BLK_ERROR;

    }
};


export const send_mail = async (body) => {
    try {
        const transport = await initializeTransport()
        let reqBody = body;
        const mailOption = {
            from: process.env.FROM_USER_EMAIL,
            to: process.env.TO_EMAIL,
            subject: `Hey Monoj you got and enquiry from ${reqBody.name}`,
            // text: `This is your enquiry email ${reqBody.email}`,
            html: `
            This is your enquiry email ${reqBody.email} and phone number ${reqBody.phone}
            <br>
            <hr>
            <b>${reqBody.message}</b>
            `
        };
        let isEmailSendSuccess = await _sendMail(transport, mailOption);

        return isEmailSendSuccess ? statusCode.EMAIL_IS_SUCCESS_SEND : statusCode.EMAIL_IS_SUCCESS_NOT_SEND;


    } catch (err) {
        commonLog(err, '', "Error Occur in Final Send Email");
        catchBlockErrorLog(err);
        return statusCode.EMAIL_CATCH_BLK_ERROR;

    }
};
