// =============================== DESIGN ROUTES ==============================
// =============================== DESIGN ROUTES ==============================
// =============================== DESIGN ROUTES ==============================

const express = require('express');

const router = express.Router();
const auth = require('../config/auth');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('design/design_home.hbs');
});

router.post('/add', (req, res) => {
  const {
    category1, category2, category3, design_name,
  } = req.body;

  const read = {
    category1, category2, category3, design_name,
  };

  res.send(req.body);

  // res.send(read);
});

module.exports = router;
