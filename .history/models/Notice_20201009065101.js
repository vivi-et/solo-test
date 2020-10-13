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
  user_id: {
    type: Sequelize.STRING,
  },

  profile_img: {
    type: Sequelize.STRING,
  },

});

Notice.belongsTo(User);
// db.sync();

module.exports = User;
