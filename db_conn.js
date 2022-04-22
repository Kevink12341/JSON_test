import mysql from 'mysql';

import { getRow } from './db_queries.js';

let MysqlCredentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "CBSdata",
  port: 4000,
};

export const DBConnection = mysql.createConnection(MysqlCredentials);

try {
  DBConnection.connect()
}catch(e) {
  console.error("DATABASE CONNECTION FAILED!", e)
}

export const DB_data = async (data) => {
  for (let i=0;i<data.length; i++) {
    let row = data[i];
    let fields = Object.keys(row);
    let queryStr = "";    
    let query_row = await getRow(row["Id"]);

    if (query_row[0]&&query_row[0]["CBSid"]&&query_row[0]["CBSid"] === row["Id"]) { 
      // update
      let values = [];
      fields.forEach((f) => {
        if(f == "Value"){
          values.push(`Waarde = ${DBConnection.escape(row[f])}`)
        }else if ( f == "Id") {
          values.push(`CBSid =${DBConnection.escape(row[f])}`)
        }else{
          values.push(`${f} = ${DBConnection.escape(row[f])}`)
        }
      console.log('all values', values)
      })
      
      queryStr = `UPDATE cbs_data_test SET  ${values.join(",")} WHERE cbs_data_test.CBSid = ${row["Id"]}; `

    }else{
        // insert     
      let values = []
      fields.forEach((f) => {
          values.push(DBConnection.escape(row[f]))
      })
        queryStr = `INSERT INTO cbs_data_test (Id,CBSid, Measure, ValueAttribute, Waarde, Bouwjaarklasse, Woningkenmerken, Energielabelklasse, GebruiksOppervlakteklasse, Percentielen, Perioden) VALUES
        (NULL, ${values.join(",")})`
    }

      DBConnection.query(queryStr, function (data,err) {

        if(err) {
          console.error("E",err,queryStr)
        }else{
          console.log("SUCCESS", data)
        }
      })
    }
};
