const inquirer = require(`inquirer`);
const sql = require(`mysql2`);
const express = require('express')
const dbFunctions = require(`./utils/dbFunctions.js`)

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
        }
        if(selection.action == "View all roles"){
            //List all in database
        }
        if(selection.action == "View all employees"){
            //List all in database
        }
        if(selection.action == "Add a department"){
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

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sql = mysql.createConnection(
    {
      host: 'localhost',
      user: '',
      password: '',
      database: ''
    },
    console.log(`Connected to the database.`)
  );

main();
