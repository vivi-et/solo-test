// =============================== DESIGN ROUTES ==============================
// =============================== DESIGN ROUTES ==============================
// =============================== DESIGN ROUTES ==============================

const express = require('express');

const auth = require('../config/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('design/design_home.hbs');
});

module.exports = router;
