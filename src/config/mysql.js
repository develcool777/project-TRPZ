const Sequelize = require('sequelize');
const mysqlUser = 'root';
const mysqlPassword = 'Astra2000';
const mysqlHost = 'localhost';
module.exports = new Sequelize('trpz', mysqlUser, mysqlPassword, {
  dialect: 'mysql',
  host: mysqlHost
});
