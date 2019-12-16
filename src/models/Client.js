const Sequelize = require('sequelize');
const db = require('../config/mysql');
const Visit = require('./Visit');

const Client = db.define('client', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  birth: {
    type: Sequelize.DATE,
    allowNull: false,
    trim: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  passport: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  }
});
Client.hasMany(Visit, { onDelete: 'cascade' });
// Room.hasOne(Visit, { onDelete: 'Cascade' });
module.exports = Room;
