const { Sequelize } = require('sequelize');

const db = require('../config/db');

const Gig = db.define('gig', {
  id: {
    type: Sequelize.NUMBER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  technologies: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.STRING,
  },
  contact_email: {
    type: Sequelize.STRING,
  },

});

module.exports = Gig;
