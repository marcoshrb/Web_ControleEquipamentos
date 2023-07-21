const sequelize = require('sequelize');
require('dotenv').config()

//configurações da base de dados
const database = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
{
    dialect: 'mssql', 
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    timezone: '-03:00'
});

database.sync();
module.exports = database;

