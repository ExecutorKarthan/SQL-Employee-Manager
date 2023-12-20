//Import needed files for sequelize to work and to connect to the database
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

//Allow Role to use the Model class features
class Role extends Model {}

//Define the table and its columns/attributes
Role.init(
  {
    role_id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title:{
      type: DataTypes.STRING(30),
    },
    salary:{
      type: DataTypes.INTEGER,
    },
    dept_id:{
      type: DataTypes.INTEGER,
      references:{
        model: 'departments',
        key: 'dept_id'
      }
    }
  }, 
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'role',
  }
);

//Export the model for use
module.exports = Role;