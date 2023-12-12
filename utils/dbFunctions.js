function seedDB(dbCon){
    dbCon.execute(`SOURCE ../db/schema.sql`)
    dbCon.execute(`SOURCE ../db/seeds.sql`)
}

function queryText(dbCon, dataTable){
    dbCon.query(`SELECT * from ${dataTable}`)
}

