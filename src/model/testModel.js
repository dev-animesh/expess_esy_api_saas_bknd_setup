import { testDbQ } from "../dao/testDao.js"

export const testDb = async (req)=>{
    try{
        console.log("MODEL")
        const res  =  await testDbQ(req);
        return res;
    }
    catch(e){

    }
}