const inquirer = require(`inquirer`);
const sequelize = require('./config/Connection.js');
const dbFunctions = require(`./utils/dbFunctions.js`)

const Department = require('./models/Department.js');
const Employee = require('./models/Employee');
const Manager = require('./models/Manager');
const Role = require('./models/Role');

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
            maxWidth = maxWidth + 5;
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
            maxWidth = maxWidth + 5;
            dbFunctions.formatTable(values, maxWidth);
        }
        if(selection.action == "View all employees"){
            let maxWidth = 0;
            //List all roles
            const rawData = await Employee.findAll(); 
            var values = [["Employee ID", "First Name", "Last Name", "Role ID"]]
            for(let index = 0; index < rawData.length; index++){
                const {emp_id, first_name, last_name, role_id} = rawData[index].dataValues
                if(emp_id.length > maxWidth){
                    maxWidth = emp_id.length;
                }
                if(first_name.length > maxWidth){
                    maxWidth = first_name.length;
                }
                if(last_name.length > maxWidth){
                    maxWidth = last_name.length;
                }
                if(role_id.length > maxWidth){
                    maxWidth = role_id.length;
                }
                values.push([emp_id, first_name, last_name, role_id]);
            };
            maxWidth = maxWidth + 5;
            dbFunctions.formatTable(values, maxWidth);
        }
        if(selection.action == "Add a department"){
            const responses = await inquirer
            .prompt([
                {
                type: "input",
                name: "dept_name",
                message: "What is the name of this new department?",
                }
            ])
            await Department.create({dept_name: responses.dept_name})
        }
        if(selection.action == "Add a role"){
            const responses = await inquirer
            .prompt([
                {
                type: "input",
                name: "title",
                message: "What is the title of this role?",
                },
                {
                type: "input",
                name: "salary",
                message: "What is the salary of this role?",
                },
                {
                type: "input",
                name: "dept_id",
                message: "What is the department id for this role?",
                },
            ])
            await Role.create({title: responses.title, 
                salary: responses.salary, 
                dept_id: responses.dept_id})
        }
        if(selection.action == "Add an employee"){ 
            const responses = await inquirer
            .prompt([
                {
                type: "input",
                name: "first_name",
                message: "What is the first name of this employee?",
                },
                {
                type: "input",
                name: "last_name",
                message: "What is the last name of this employee?",
                },
                {
                type: "input",
                name: "role_id",
                message: "What is the role id for this employee?",
                },
                {
                type: "input",
                name: "manager_id",
                message: "What is the manager id for this employee?",
                }
            ])
            await Employee.create({first_name: responses.first_name, 
                last_name: responses.last_name, 
                role_id: responses.role_id,
                manager_id: responses.manager_id
            })
        }
        if(selection.action == "Update an employee role"){
            var employees = [];
            const rawData = await Employee.findAll();
            for(let index = 0; index < rawData.length; index++){
                const {first_name, last_name} = rawData[index].dataValues
                let name = first_name + " " + last_name;
                employees.push(name);
            }
            const responses = await inquirer
            .prompt([
                {
                    type: "list",
                    name: "full_name",
                    message: "Which employee would you like to update?",
                    choices: employees
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "What is the new role id for this employee?",
                },
            ])
            const spaceSpot = responses.full_name.search(" ");
            const cut_first_name = responses.full_name.slice(0, spaceSpot);
            const cut_last_name = responses.full_name.slice(spaceSpot+1);
            const employeeToUpdate = await Employee.findOne({ where: {first_name: cut_first_name, 
                last_name: cut_last_name,} 
            })
            await employeeToUpdate.update({role_id: responses.role_id})
        }
        if(selection.action == "Exit"){
            loop = false;
            console.log("Program terminated")
            return loop;
        }
    }
}

main()