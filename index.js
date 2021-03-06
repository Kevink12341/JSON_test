import { import_data } from './db_data_export.js';
import { import_schema } from './db_data_export.js';
// var db = require('./db_conn');
import { DB_data } from "./db_conn.js"
import {DB_create_variables} from "./db_create_table.js"
import {create_cbs_tables} from "./create_db_logic.js"
import {cbs_Table_Data_Exists} from "./db_create_table.js"
import {check_Data_Exists_In_CBS_Tables} from "./db_create_table.js"

// import_data().then((data) => {
//     DB_data(data)
// });


import_schema().then((data)=>{
    create_cbs_tables();
   return DB_create_variables(data);
}).then((values) => {
 return check_Data_Exists_In_CBS_Tables(values, cbs_Table_Data_Exists(values))
});
