export function pQuery(connection,query) {
    return new Promise((resolve,reject) => {
       connection.query(query, function(err,result){
           if (err){
               reject (err)
           }

           resolve(result)
       });
    })
}