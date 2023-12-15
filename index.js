const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const dbFunctions = require('./utils/dbFunctions.js')
const sequelize = require('./config/connection.js');

async function addDept(con){
    await inquirer
    .prompt([
        {
            type: "input",
            name: "dept_name",
            message: "What is the new department's name?",
        },
        {
            type: "input",
            name: "dept_id",
            message: "What is the new department's id?",
        }
    ])
    .then((responses) =>{
        console.log(responses)
        dbFunctions.add(con, `department`, responses)
    })
}

async function main() {      
    
    const con = mysql.createConnection(
        {
          host: processedData.host,
          user: processedData.user,
          password: processedData.password,
          database: processedData.database,
        },
        console.log(`Connected to SQL.`)
      );

    var loop = true;

    while(loop){
        const selection = await inquirer
        .prompt([
            {
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: ["View all departments", 
                "View all roles", 
                "View all employees",
                "Add a department",
                "Add a role", 
                "Add an employee",
                "Update an employee role",
                "Exit"
                ]
            }
        ])
        if(selection.action == "View all departments"){
            //List all in database
            console.log("Show the departments")
            dbFunctions.queryText(con, `department`)
        }
        if(selection.action == "View all roles"){
            dbFunctions.queryText(con, `role`)
            //List all in database
        }
        if(selection.action == "View all employees"){
            dbFunctions.queryText(con, `employee`)
            //List all in database
        }
        if(initialQ.action == "Add a department"){
            await addDept(con);   
        }
        if(selection.action == "Add a role"){
            //add role to role table
        }
        if(selection.action == "Add an employee"){
            //add employee to employee table
        }
        if(selection.action == "Update an employee"){
            //change employee data
        }
        if(selection.action == "Exit"){
            loop = false;
        }
    return loop;
    }
}

//dbFunctions.seedDB(con)

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    main();
  });
console.log("Program terminated")
