import { import_data } from './db_data_export.js';
// var db = require('./db_conn');
import { DB_data } from "./db_conn.js"

import_data().then((data) => {
    DB_data(data)
});
