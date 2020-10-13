const { Sequelize } = require('sequelize');

const db = require('../config/db');
const User = require('./User');

const Notice = db.define('notice', {
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

Notice.belongsTo(User);
// db.sync();

module.exports = User;
