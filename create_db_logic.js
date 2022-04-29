import { DBConnection } from "./db_conn.js";
import { MysqlCredentials } from "./db_conn.js";

function db_exists() {
    let database_name = MysqlCredentials.database
    let table_exists = `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = '${database_name}' AND table_name = 'CBS_tables')`
    
    return new Promise((resolve, reject) => {

        DBConnection.query(table_exists, function(err,result){
            if (err) {
                reject(err)
            }
            resolve(result[0][Object.keys(result[0])])
        });
    })
};


let exists = await db_exists()

export const create_cbs_tables = () => {
    
    if (exists == 0) {
        let sql_string = "CREATE TABLE CBS_tables (id INT AUTO_INCREMENT PRIMARY KEY, tableName VARCHAR(255), tableAlias VARCHAR(255), CBSdatabase VARCHAR(255), updateIdentifier VARCHAR(255))"

        DBConnection.query(sql_string, function(err, result){
            if (err) throw (err);
    })
} else return console.log(true)
};