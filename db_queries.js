import { DBConnection } from "./db_conn.js";


export function getRow(id){
    return new Promise((resolve, reject) => {
  
      DBConnection.query(`SELECT CBSid FROM cbs_data_test WHERE CBSid = ${id} `, function(err, result){
        if (err) reject (err);
        resolve(result);
      })
  
    })
  };

export function getTable(databaselink){
  return new Promise((resolve, reject) => {
    DBConnection.query(`SELECT tableName FROM CBS_tables WHERE CBSdatabase = ${databaselink}`, function(err, result){
      if (err) reject (err);
      resolve(result);
    })
  })
}