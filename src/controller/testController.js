import express from 'express';
import { testDb } from '../model/testModel.js';
import { requestBodyValidator } from '../custom_middleware/requestbodyValidatorMiddleware.js';
import { userSchema } from '../request.body_schema/testReqBodySchema.js';
import { catchBlockErrorLog } from '../utils/catchblockError.js';
import { commonLog } from '../utils/commonConsole.js';
import { createResponse } from '../constants/createResponse.js';
import { statusCode } from '../constants/statusCode.js';

const router = express.Router();

//------- Test controller ------------
router.post('/v1/test', requestBodyValidator(userSchema), async (req, res) => {
    try {
        let data = req.body;
        const response = await testDb(data)
        return createResponse(res, statusCode.OK, statusCode.OK, "Ok", [])
    }
    catch (e) {
        catchBlockErrorLog(e)
        commonLog(e, '', "Error Occur in controller");
        return createResponse(res, statusCode.OK, statusCode.INTERNAL_SERVER_ERROR, "Internal Server Error", null, true)

    }
})


//------- Test controller ------------
router.get('/v1/test1', async (req, res) => {
    try {
        commonLog("Ok");
        // throw new Error("This is error")
        let data = req.body;
        const response = await testDb(data);
        return res.status(200).json({ message: "ok" })
    }
    catch (e) {
        catchBlockErrorLog(e);
        commonLog(e, '', "Error Occur in controller");
        return createResponse(res, statusCode.OK, statusCode.INTERNAL_SERVER_ERROR, "Internal Server Error", null, true)
    }
})


export default router;
