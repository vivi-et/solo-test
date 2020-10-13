const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Test = db.define('Test', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  option: {
    type: Sequelize.JSON,
  },

});

// Test.belongsTo(User);

module.exports = Test;
