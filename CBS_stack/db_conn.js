import mysql from 'mysql';

let MysqlCredentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "CBSdata",
  port: 4000,
};

const DBConnection = mysql.createConnection(MysqlCredentials);

try {
  DBConnection.connect()
}catch(e) {
  console.error("DATABASE CONNECTION FAILED!", e)
}

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE CBS__import (name VARCHAR(255), address VARCHAR(255))";
//   var custdata = ["name", 'address']
//   con.query(sql, [custdata] , function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
//   con.end()
// });

export const DB_data = (data) => {
  for (let i=0;i<data.length; i++) {
    let row = data[i];
    let fields = Object.keys(row);
    let queryStr = "";

    DBConnection.query(`SELECT CBSid FROM cbs_data_test WHERE CBSid = ${row["Id"]} `, function(err, result,keys){
      if (err) throw err;
      console.log(result)
      if (result["CBSid"] === row["Id"]) {
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
    })



  

  }
  };
