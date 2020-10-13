const { Sequelize } = require("sequelize");
const db = require("../config/db");

const Design = db.define("design", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  image_main: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.JSON,
  },
  title: {
    type: Sequelize.STRING,
  },
  images_sub: {
    type: Sequelize.JSON,
  },
  format: {
    type: Sequelize.JSON,
  },
  title: {
    type: Sequelize.STRING,
  },

  title: {
    type: Sequelize.STRING,
  },
});

module.exports = Design;
