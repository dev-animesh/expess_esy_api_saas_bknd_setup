//------------------ MYSQL2/PHPMYADMIN CONFIG --------------------

import mysql from 'mysql2';
import { DB_CONFIG_MYSQL } from '../config.js';
import { commonLog } from '../utils/commonConsole.js';

var pool = mysql.createPool(Object.freeze(DB_CONFIG_MYSQL));


export const MYSQL_CONN = pool.promise();

commonLog('MYSQL Database is connected...', "info");
