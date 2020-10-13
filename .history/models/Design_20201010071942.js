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
  category1: {
    type: Sequelize.STRING,
  },
  category2: {
    type: Sequelize.STRING,
  },
  category3: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },

  images_sub: {
    type: Sequelize.JSON,
  },

  title: {
    type: Sequelize.STRING,
  },

  title: {
    type: Sequelize.STRING,
  },

  title: {
    type: Sequelize.STRING,
  },

});

module.exports = Design;
