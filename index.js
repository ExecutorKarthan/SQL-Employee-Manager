const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const dbFunctions = require('./utils/dbFunctions.js')
const fs = require('node:fs');


async function init(){
    await inquirer
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
    .then((selection) =>{
        if(selection.action == "View all departments"){
            //List all in database
            dbFunctions(con, `departments`)
        }
        if(selection.action == "View all roles"){
            dbFunctions(con, `roles`)
            //List all in database
        }
        if(selection.action == "View all employees"){
            dbFunctions(con, `employees`)
            //List all in database
        }
        if(selection.action == "Add a department"){
            const deptName = await input(
                {
                    message: "What is the new department's name?"
                });
            const deptID = await input(
                {
                    message: "What is the new department's ID?"
                });
        }
            console.log(deptName + " and " + deptID)
            //Add dept to dept table
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
    })
    return loop;
}

async function main() {      
    var loop = true;

    while(loop){
        loop = await init()
    }
}

const processedData = JSON.parse(fs.readFileSync('./credentials.json'));

const con = mysql.createConnection(
    {
      host: processedData.host,
      user: processedData.user,
      password: processedData.password,
    },
    console.log(`Connected to SQL.`)
  );

//dbFunctions.seedDB(con)

main(con);
