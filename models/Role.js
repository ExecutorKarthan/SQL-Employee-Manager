const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Connection');

class Role extends Model {}

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

module.exports = Role;
