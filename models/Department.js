const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

class Department extends Model {}

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

module.exports = Department;
