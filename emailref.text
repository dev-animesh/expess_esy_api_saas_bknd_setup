
require('dotenv').config();
const nodeMailer = require('nodemailer');
const respStruct = require('../constants/respStructure');
const emailDao = require('../dao/emailDao')

const initializeTransport = async () => {
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
        console.error("Error initializing transport:", err);
        throw err; // Propagate the error
    }
};



const _sendMail = async (transport, mailOption) => {
    try {
        let data = await transport.sendMail(mailOption);
        return true;
    } catch (err) {
        console.error("Error sending mail:", err);
        return false;
    }
};

module.exports.send_mail = async (body) => {
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
        let isSuccessEmail = await _sendMail(transport, mailOption);

        if (isSuccessEmail == true) {
            let dbRes = await emailDao.store_email_enquiry(reqBody);
            if (dbRes == -500)
                return respStruct.responseStruct(0, false, 400, "Mail sending failed", null);
            else
                return respStruct.responseStruct(1, true, 200, "Mail send successfully", null);
        } else {
            return respStruct.responseStruct(0, false, 400, "Mail sending failed", null);
        }

    } catch (err) {
        console.error("-----Email model Err--->", err);
        return respStruct.responseStruct(0, false, 500, 'Internal server error', false);
    }
};
