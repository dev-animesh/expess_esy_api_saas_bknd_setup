import { PG_WRITE_POOL } from '../../db_connections/dbconn_postgress.js';
import { commonLog } from '../commonConsole.js';


//------------- Execute More than one Query --------------
export const runTransactionQueries = async (queries) => {
    const client = await PG_WRITE_POOL.connect(); // Connect to the pool
    try {
        await client.query('BEGIN'); // Start the transaction

        const results = [];
        for (const { query, params } of queries) {
            const result = await client.query(query, params); // Execute each query
            results.push(result); // Collect results for each query
        }

        await client.query('COMMIT'); // Commit the transaction
        return results; // Return the results of the queries
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        commonLog('Transaction failed, rolling back.', 'error');
        throw error; // Rethrow the error for handling
    } finally {
        client.release(); // Release the client back to the pool
    }
};


/**
 *  // USE --------------------
 * import { runTransactionQueries } from './path-to-your-transaction-method';

const executeQueries = async () => {
  try {
    const queries = [
      {
        query: 'UPDATE users SET name = $1 WHERE id = $2',
        params: ['John Doe', 1],
      },
      {
        query: 'INSERT INTO logs (message) VALUES ($1)',
        params: ['User updated'],
      },
    ];

    const results = await runTransactionQueries(queries);
    console.log('Transaction succeeded:', results);
  } catch (error) {
    console.error('Transaction failed:', error.message);
  }
};

executeQueries();
 */