import { import_data } from './db_data_export.js';
import { import_schema } from './db_data_export.js';
// var db = require('./db_conn');
import { DB_data } from "./db_conn.js"
import {DB_create_variables} from "./db_create_table.js"
import {create_cbs_tables} from "./create_db_logic.js"


// import_data().then((data) => {
//     DB_data(data)
// });

import_schema().then((data)=>{
    create_cbs_tables();
    DB_create_variables(data);
});
