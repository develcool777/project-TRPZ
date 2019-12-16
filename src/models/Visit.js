const Sequelize = require('sequelize');
const db = require('../config/mysql');

const visit = db.define('visit', {
  deposit: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false,
    trim: true
  },
  last: {
    type: Sequelize.DATE,
    allowNull: false,
    trim: true
  }
});

module.exports = visit;
