const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

class Employee extends Model {}

Employee.init(
  {
    emp_id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    manager_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, 
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'employee',
  }
);

module.exports = Employee;
