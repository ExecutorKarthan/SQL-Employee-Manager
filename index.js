//Import required libraries for code functionality
const inquirer = require(`inquirer`);
const sequelize = require('./config/Connection.js');
const dbFunctions = require(`./utils/dbFunctions.js`)

//Import data models
const Department = require('./models/Department.js');
const Employee = require('./models/Employee');
const Manager = require('./models/Manager');
const Role = require('./models/Role');

//Create a link where departments have multiple roles and roles have a link to department ids
Department.hasMany(Role, {
    foreignKey: 'dept_id',
  });
  
Role.belongsTo(Department, {
    foreignKey: 'dept_id',
    onDelete: 'CASCADE',
  });
  
//Create a link where roles have multiple employees and employees have links to the role ids
Role.hasMany(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
  })
  
Employee.belongsTo(Role, {
    foreignKey: 'role_id',
  })

//Create a link where roles have multiple managers and managers have links to the role ids
Role.hasMany(Manager, {
    foreignKey: 'role_id' ,
    onDelete: 'CASCADE',
  })
  
Manager.belongsTo(Role, {
    foreignKey: 'role_id' ,
  })
  
//Create a link where managers have multiple employees and employees link to manager ids
Manager.hasMany(Employee, {
    foreignKey: 'manager_id',
    onDelete: 'CASCADE',
  })
  
Employee.belongsTo(Manager, {
      foreignKey: 'manager_id' 
    })

//Create a primary function to execute our program
async function main() {      
    //Connect to the SQL database
    await sequelize.sync({ 
    })
    console.log(`Connected to SQL.`)

    //Create a continuous loop the so the program runs until exited
    var loop = true;
    while(loop){

        //Prompt the user to determine what action(s) need to be taken
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

        // Display all departments if selected
        if(selection.action == "View all departments"){
            let maxWidth = 0;
            //Pull all department data table values
            const rawData = await Department.findAll(); 
            var values = [["Department ID", "Department Name"]];
            for(heading in values[0]){
                const headingWidth = heading.length
                if(headingWidth > maxWidth){
                    maxWidth = headingWidth;
                }
            }
            //Pull data from the dept table, determine its size and add it to an array for printing
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
            //Pass the value array and the max width to a function for formatting and console logging
            dbFunctions.formatTable(values, maxWidth);
        }

        //Display all roles if selected
        if(selection.action == "View all roles"){
            let maxWidth = 0;
            //Pull all role data table values
            const rawData = await Role.findAll(); 
            var values = [["Title", "Role ID", "Department ID", "Salary"]]
            //Pull data from the dept table, determine its size and add it to an array for printing
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
                values.push([title, role_id, dept_id, salary]);
            };
            //Pass the value array and the max width to a function for formatting and console logging
            maxWidth = maxWidth + 5;
            dbFunctions.formatTable(values, maxWidth);
        }

        //List all employees and their data if selected
        if(selection.action == "View all employees"){
            let maxWidth = 0;
            //Pull data from the employee table, as well as pulling linked data from the Role and Manager tables
            const rawData = await Employee.findAll({
                include: [
                    {model: Role, attributes:['title', 'salary'], 
                    include:[{model: Department, attributes: ['dept_name']}]}, 
                    {model: Manager, attributes:['first_name', 'last_name']}
                ]
            }); 
            var values = [["Employee ID", "First Name", "Last Name", "Job Title", "Department", "Salary", "Reporting Manager"]]
            //Pull data from the dept table, determine its size and add it to an array for printing
            for(let index = 1; index < rawData.length; index++){
                const {emp_id, first_name, last_name} = rawData[index].dataValues;
                const {title, salary} = rawData[index].dataValues.role.dataValues;
                const {dept_name} = rawData[index].dataValues.role.dataValues.department.dataValues;
                let manager_name = "";
                //Attempt to locate a manager for the employee. If it is not found, set the value to 'Null'
                try{
                    manager_name = rawData[index].dataValues.manager.dataValues.first_name + " " + rawData[index].dataValues.manager.dataValues.last_name;    
                }
                catch{
                    manager_name = "Null";
                }
                if(emp_id.length > maxWidth){
                    maxWidth = emp_id.length;
                }
                if(first_name.length > maxWidth){
                    maxWidth = first_name.length;
                }
                if(last_name.length > maxWidth){
                    maxWidth = last_name.length;
                }
                if(title.length > maxWidth){
                    maxWidth = title.length;
                }
                if(salary.length > maxWidth){
                    maxWidth = salary.length;
                }
                if(dept_name.length > maxWidth){
                    maxWidth = dept_name.length;
                }
                if(manager_name.length > maxWidth){
                    maxWidth = manager_name.length;
                }
                values.push([emp_id, first_name, last_name, title, dept_name, salary, manager_name]);
            };
            maxWidth = maxWidth + 4;
            //Pass the value array and the max width to a function for formatting and console logging
            dbFunctions.formatTable(values, maxWidth);
        }

        //Add a new department to the database
        if(selection.action == "Add a department"){
            //Gather user information for the new department
            const responses = await inquirer
            .prompt([
                {
                type: "input",
                name: "dept_name",
                message: "What is the name of this new department?",
                }
            ])
            //Create the new department and add it to the department table
            await Department.create({dept_name: responses.dept_name})
        }

        //Add a new role to the database
        if(selection.action == "Add a role"){
            //Gather user information for the new role
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
            //Create the new role and add it to the role table
            await Role.create({title: responses.title, 
                salary: responses.salary, 
                dept_id: responses.dept_id})
        }

        //Add a new employee to the database
        if(selection.action == "Add an employee"){ 
            //Gather user information for the new employee
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
            //Create the new employee and add it to the employee table
            await Employee.create({first_name: responses.first_name, 
                last_name: responses.last_name, 
                role_id: responses.role_id,
                manager_id: responses.manager_id
            })
        }

        //Change a current employee's role
        if(selection.action == "Update an employee role"){
            //Create a list of employees to select from
            var employees = [];
            const rawData = await Employee.findAll();
            for(let index = 0; index < rawData.length; index++){
                const {first_name, last_name} = rawData[index].dataValues
                let name = first_name + " " + last_name;
                employees.push(name);
            }
            //Determine which employee needs to have a change of role
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
            //Parse the selected name into two variables
            const spaceSpot = responses.full_name.search(" ");
            const cut_first_name = responses.full_name.slice(0, spaceSpot);
            const cut_last_name = responses.full_name.slice(spaceSpot+1);
            //Locate the employee in the employee table using the first and last name selected
            const employeeToUpdate = await Employee.findOne({ where: {first_name: cut_first_name, 
                last_name: cut_last_name,} 
            })
            //Update the selected employee's role
            await employeeToUpdate.update({role_id: responses.role_id})
        }
        
        //Terminates the loop if selected
        if(selection.action == "Exit"){
            //Creates a break in the while loop by setting it to false, then returning that value
            loop = false;
            console.log("Program terminated")
            return loop;
        }
    }
}

//Call the primary function
main()