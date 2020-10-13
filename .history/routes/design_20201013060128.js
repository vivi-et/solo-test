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
  // destructuring data
  const {
    catagory1_1,
    catagory1_2,
    catagory1_3,
    design_name1,
    skills1,
    ...catagoryN_3
  } = req.body;

  //

  // res.send(read);
});

module.exports = router;
