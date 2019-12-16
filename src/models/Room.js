const Sequelize = require('sequelize');
const db = require('../config/mysql');
const Visit = require('./Visit');

const Room = db.define('room', {
  flour: {
    type: Sequelize.INTEGER,
    allowNull: false,
    trim: true
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  building: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    trim: true
  },
  comfort: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    trim: true
  },
  deposit: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    trim: true
  }
});

Room.hasOne(Visit, { onDelete: 'Cascade' });
module.exports = Room;
