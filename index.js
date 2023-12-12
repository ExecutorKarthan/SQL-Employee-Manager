const sql = require(`mysql2`);
const inquirer = require(`inquirer`);


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

        }
        if(selection.action == "View all roles"){

        }
        if(selection.action == "View all employees"){

        }
        if(selection.action == "Add a department"){

        }
        if(selection.action == "Add a role"){

        }
        if(selection.action == "Add an employee"){

        }
        if(selection.action == "Update an employee"){

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

main();
