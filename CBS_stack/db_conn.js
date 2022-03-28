var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "CBSdata",
  port: 4000,
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO cbsdata_1 VALUES ?" ;
//   var data = [[1,2,3,4,5,6]] ;
//   con.query(sql,[data], function (err,result){
//     if (err) throw err;
//     console.log("Data added")
//     con.end()
//   })
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  var custdata = ["name", 'address']
  con.query(sql, [custdata] , function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  con.end()
});