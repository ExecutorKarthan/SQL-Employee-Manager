//Import needed files for sequelize to work and to connect to the database
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

//Allow Department to use the Model class features
class Department extends Model {}

//Define the table and its columns/attributes
Department.init(
  {
    dept_id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    dept_name:{
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  }, 
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'departments',
  }
);

//Export the model for use
module.exports = Department;