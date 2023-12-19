const Department = require('./Department');
const Employee = require('./Employee');
const Manager = require('./Manager');
const Role = require('./Role');


//Create a link where the role model imports an ID from the department model
Role.hasOne(Department, {
  foreignKey: 'dept_id',
  onDelete: 'CASCADE',
});

Department.belongsTo(Role, {
  foreignKey: 'dept_id',
});

//Link the role_id to the employee and manager models
Role.belongsToMany(Employee, {through: 'role_id'})
Role.belongsToMany(Manager, {through: 'role_id'})

//Create a link where the employee model imports an ID from the manager model
Manager.hasMany(Employee, {
  foreignKey: 'manager_id',
  onDelete: 'CASCADE',
})

Employee.belongsTo(Manager, {
    foreignKey: 'manager_id' 
  })

module.exports = { Department, Employee, Manager, Role };
