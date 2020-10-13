const { Sequelize } = require('sequelize');

const db = require('../config/db');

const User = db.define('gig', {
  id: {
    type: Sequelize.NUMBER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
  },
  profile_img: {
    type: Sequelize.STRING,
  },

});

module.exports = User;
