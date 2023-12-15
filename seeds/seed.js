const sequelize = require('../config/Connection');

const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');
const Role = require('../models/Role');

const departmentSeedData = require('./DeptSeed.json');
const employeeSeedData = require('./EmployeeSeed.json');
const managerSeedData = require('./ManagerSeed.json');
const roleSeedData = require('./RoleSeed.json');

// TODO Use async / await to Refactor the seedDatabase function below
const seedDatabase = async () => {
  await sequelize.sync({ 
    force: true 
  })

  await Department.bulkCreate(departmentSeedData);

  await Employee.bulkCreate(employeeSeedData);

  await Manager.bulkCreate(managerSeedData);

  await Role.bulkCreate(roleSeedData);
  
  console.log('All Seeds Planted'); 

  process.exit(0);
};

seedDatabase();
