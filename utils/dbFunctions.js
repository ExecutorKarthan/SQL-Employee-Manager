function seedDB(dbCon){
    dbCon.query(`SOURCE ../db/schema.sql`);
    console.log(`DB created`);
    dbCon.query(`SOURCE ../db/seeds.sql`);
    console.log(`DB seeded.`);
}

function queryText(dbCon, dataTable){
  console.log(`Query is: SELECT * FROM ${dataTable};`)
  dbCon.execute(`SELECT * FROM ${dataTable};`, [dataTable],  
  function(err, results){
    console.log(err)
    console.log(results);
  });
}

function add(dbCon, tableName, values){
    dbCon.query(`INSERT INTO ${tableName} (id, dept_name) VALUES(?, ?)`, values, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

module.exports ={seedDB, queryText, add}