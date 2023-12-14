function seedDB(dbCon){
    dbCon.query(`SOURCE ../db/schema.sql`);
    console.log(`DB created`);
    dbCon.query(`SOURCE ../db/seeds.sql`);
    console.log(`DB seeded.`);
}

function queryText(dbCon, dataTable){
    dbCon.query(`SELECT * from ${dataTable}`)
}

function add(dbCon, tableName, values){
    dbCon.query(`INSERT INTO ${tableName} (id, dept_name) VALUES(?, ?)`, values, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
}

module.exports ={seedDB, queryText}