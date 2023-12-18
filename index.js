const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const sequelize = require('./config/Connection.js');
const dbFunctions = require(`./utils/dbFunctions.js`)

const Department = require('./models/Department.js');
const Employee = require('./models/Employee');
const Manager = require('./models/Manager');
const Role = require('./models/Role');

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
    
    await sequelize.sync({ 
    })
    
    console.log(`Connected to SQL.`)

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
            let maxWidth = 0;
            //List all departments
            const rawData = await Department.findAll(); 
            var values = [["Department ID", "Department Name"]];
            for(heading in values[0]){
                const headingWidth = heading.length
                if(headingWidth > maxWidth){
                    maxWidth = headingWidth;
                }
            }
            for(let index = 0; index < rawData.length; index++){
                const {dept_id, dept_name} = rawData[index].dataValues
                if(dept_id.length > maxWidth){
                    maxWidth = dept_id.length;
                }
                if(dept_name.length > maxWidth){
                    maxWidth = dept_name.length;
                }
                values.push([dept_id, dept_name]);
            };
            dbFunctions.formatTable(values, maxWidth);
        }
        if(selection.action == "View all roles"){
            let maxWidth = 0;
            //List all roles
            const rawData = await Role.findAll(); 
            var values = [["Role ID", "Title", "Salary", "Department ID"]]
            for(let index = 0; index < rawData.length; index++){
                const {role_id, title, salary, dept_id} = rawData[index].dataValues
                if(role_id.length > maxWidth){
                    maxWidth = role_id.length;
                }
                if(title.length > maxWidth){
                    maxWidth = title.length;
                }
                if(salary.length > maxWidth){
                    maxWidth = salary.length;
                }
                if(dept_id.length > maxWidth){
                    maxWidth = dept_id.length;
                }
                values.push([role_id, title, salary, dept_id]);
            };
            dbFunctions.formatTable(values, maxWidth);
        }
        if(selection.action == "View all employees"){
            //dbFunctions.queryText(con, `employee`)
            //List all in database
        }
        if(selection.action == "Add a department"){
            
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
            console.log("Program terminated")
            return loop;
        }
    }
}

main()
