import { DBConnection } from "./db_conn.js";


export function getRow(id){
    return new Promise((resolve, reject) => {
  
      DBConnection.query(`SELECT CBSid FROM cbs_data_test WHERE CBSid = ${id} `, function(err, result){
        if (err) reject (err);
        resolve(result);
      })
  
    })
  };

