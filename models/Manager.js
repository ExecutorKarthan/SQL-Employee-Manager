const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

class Manager extends Model {}

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

module.exports = Manager;
