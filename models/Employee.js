//Import needed files for sequelize to work and to connect to the database
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

//Allow Employee to use the Model class features
class Employee extends Model {}

//Define the table and its columns/attributes
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
      allowNull: false,
    },
    manager_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, 
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'employee',
  }
);

//Export the model for use
module.exports = Employee;