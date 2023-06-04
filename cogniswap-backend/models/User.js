const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  study: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teach: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = User;
