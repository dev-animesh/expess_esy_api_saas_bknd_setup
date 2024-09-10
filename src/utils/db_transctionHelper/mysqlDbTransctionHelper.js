
import { commonLog } from "../commonConsole";
import { MYSQL_CONN } from "../../db_connections/dbconn_sql";

export const executeTransaction = async (queries) => {
    const connection = await MYSQL_CONN.getConnection();
    try {
        // Begin transaction
        await connection.beginTransaction();

        // Execute queries
        for (let query of queries) {
            await connection.query(query.sql, query.params);
        }

        // Commit the transaction
        await connection.commit();

        return { success: true, message: 'Transaction committed successfully.' };
    } catch (error) {
        // Rollback the transaction in case of error
        await connection.rollback();
        commonLog(`Transaction failed: ${error.message}`, 'error');
        return { success: false, message: 'Transaction rolled back.', error };
    } finally {
        // Release the connection back to the pool
        connection.release();
    }
};


/*
const queries = [
{ sql: 'INSERT INTO users (name, email) VALUES (?, ?)', params: ['John', 'john@example.com'] },
{ sql: 'UPDATE accounts SET balance = balance - 100 WHERE user_id = ?', params: [1] }
];

*/