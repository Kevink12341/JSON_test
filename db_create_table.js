import { DBConnection } from "./db_conn.js";

const IDtypes = {
  "Edm.Int64": "INT(64)", 
  "Edm.String": "VARCHAR(255)",
  "Edm.Double": "DOUBLE" ,
  "Edm.Int32": "INT(32)",
  "Edm.Boolean": "BOOLEAN"
};

export const DB_create_variables = (data) => {
  let table_name = data.name.tableid
  


  // Determines the values of the columns for the Table
  let column_values = []
  for (let i=0;i<data.properties.length;i++){
    column_values.push(data.properties[i].name)
  }

  // Determines the appropiate values for the column name
  let column_types = []
  for (let i=0;i<data.properties.length;i++){
    column_types.push(data.properties[i].type)
  }

  // Converts the EDM values to SQL values
  let column_sql_types = [];
  for (let i=0;i<column_types.length;i++){
    switch (String(column_types[i])) {
      case "Edm.Int64":
        column_sql_types.push(IDtypes["Edm.Int32"])
        break;
      case "Edm.String":
        column_sql_types.push(IDtypes["Edm.String"])
        break;
      case "Edm.Double":
        column_sql_types.push(IDtypes["Edm.Double"])
        break;
      case "Edm.Int32":
        column_sql_types.push(IDtypes["Edm.Int32"])
        break;
      case "Edm.Boolean":
        column_sql_types.push(IDtypes["Edm.Boolean"])
        break;
      default:
        console.log("Data Type not found")
    }
  }

  // String for MySQL column input
  let column_string = ""

  for (let i=0; i<column_values.length;i++){
    column_string += column_values[i] + ' ' + column_sql_types[i]
    if (i < column_types.length -1){
      column_string += ","
    }
  }

  // console.log(column_sql_types, column_values)
  let sql_create_db = `CREATE TABLE ${table_name} ( ${column_string})`;

  DBConnection.query(sql_create_db, function(err, result){
    if (err) throw (err);
    console.log("Table creation successful")
  })
};
