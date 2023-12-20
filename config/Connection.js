//Import libraries to allow for configuration to be determined
require('dotenv').config();
const Sequelize = require('sequelize');

//Import SQL credentials in a secure manner and store them for future database connections
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

//Export module for use
module.exports = sequelize;