import { DBConnection } from "./db_conn.js";
import { xml_text_parse } from "./XML_parse.js";

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

  let sql_create_db = `CREATE TABLE ${table_name} (${column_string})`;

  // write XML to CBS_tables for table identifiers
  let CBS_tables_values_Object = {
    "tableName": table_name,
    "CBSdatabase":String(table_name).slice(0,table_name.lastIndexOf("NED")+3),
    "updateIdentifier": String(table_name).slice(table_name.lastIndexOf("NED")+3,table_name.length)
  }

  let CBS_Tables_ColumnName = "";
  let CBS_Tables_Values = "";
  for(let i=0 ; i < Object.keys(CBS_tables_values_Object).length ; i++){
    CBS_Tables_ColumnName += Object.keys(CBS_tables_values_Object)[i];
    if(i< Object.keys(CBS_tables_values_Object).length-1){
      CBS_Tables_ColumnName += ","
    }
    CBS_Tables_Values += `"` +CBS_tables_values_Object[Object.keys(CBS_tables_values_Object)[i]] + `"`
    if(i< Object.keys(CBS_tables_values_Object).length-1){
      CBS_Tables_Values += ","
    }
  }

// Writes data to CBS_tables and creates a table with column names

  if (cbs_data_exists == 0) {
  let sql_CBS_tables = `INSERT INTO CBS_tables (${CBS_Tables_ColumnName}) VALUES (${CBS_Tables_Values})`;
  DBConnection.query(sql_CBS_tables, function(err,result){
    if (err) throw (err)
  })
  DBConnection.query(sql_create_db, function(err, result){
    if (err) throw (err);
    console.log("Table creation successful")
  })
} else console.log("data exists")
  
};

function cbs_Table_Data_Exists() {
  let data_Exists = `SELECT EXISTS (SELECT 1 FROM CBS_tables WHERE tableName = '${CBS_tables_values_Object.tableName}' )`
  return new Promise((resolve, reject) => {

    DBConnection.query(data_Exists, function(err,result){
        if (err) {
            reject(err)
        }
        resolve(result[0][Object.keys(result[0])])
      })
})};

let cbs_data_exists = await cbs_Table_Data_Exists()