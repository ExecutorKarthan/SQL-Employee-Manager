//Import configuration for accessing the database
const sequelize = require('../config/connection');

//Import models for table use
const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');
const Role = require('../models/Role');

//Import sample data to populate the databases
const departmentSeedData = require('./DeptSeed.json');
const employeeSeedData = require('./EmployeeSeed.json');
const managerSeedData = require('./ManagerSeed.json');
const roleSeedData = require('./RoleSeed.json');

//Connect to the database and overwrite present data if need be
const seedDatabase = async () => {
  await sequelize.sync({ 
    force: true 
  })

  //Load the seed data and bulk create the tables
  await Department.bulkCreate(departmentSeedData);
  await Employee.bulkCreate(employeeSeedData);
  await Manager.bulkCreate(managerSeedData);
  await Role.bulkCreate(roleSeedData);
  
  //Provide confirmation and exit the process
  console.log('All Seeds Planted'); 
  process.exit(0);
};

//Call the main function for operation
seedDatabase();