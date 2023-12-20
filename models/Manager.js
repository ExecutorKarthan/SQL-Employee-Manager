//Import needed files for sequelize to work and to connect to the database
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

//Allow Manager to use the Model class features
class Manager extends Model {}

//Define the table and its columns/attributes
Manager.init(
  {
    manager_id:{
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
  }, 
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'manager',
  }
);

//Export the model for use
module.exports = Manager;