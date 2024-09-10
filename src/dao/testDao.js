import { MYSQL_CONN } from "../db_connections/dbconn_sql.js";


export const testDbQ = async (data) => {
    try {
        console.log("DAO")
        return "ok"
        const data  = MYSQL_CONN.query('',[])
    }
    catch (err) {

    }
}