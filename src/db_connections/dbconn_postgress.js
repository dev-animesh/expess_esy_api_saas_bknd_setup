//------------------ POSTGRESS CONF --------------------
// const Pool = require('pg').Pool;
import { commonLog } from '../utils/commonConsole.js';

import { Pool } from 'pg';
import { DB_CONFIG_POSTGRES } from '../config';



export const PG_READ_POOL = new Pool(Object.freeze(DB_CONFIG_POSTGRES));
export const PG_WRITE_POOL = new Pool(Object.freeze(DB_CONFIG_POSTGRES));


commonLog('Postgres Database is connected...', "info");

