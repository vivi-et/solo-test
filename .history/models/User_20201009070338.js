const { Sequelize } = require('sequelize');

const db = require('../config/db');
const Notice = require('./Notice');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  profile_img: {
    type: Sequelize.STRING,
  },

});

User.hasMany(Notice);



module.exports = User;
