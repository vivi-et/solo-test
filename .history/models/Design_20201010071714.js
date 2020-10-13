const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Design = db.define('design', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  image_main: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  option: {
    type: Sequelize.JSON,
  },

});


module.exports = Design;

