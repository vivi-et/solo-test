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

  res.send(req.body)
  // destructuring data
  // const {
  //   catagory1_1,
  //   catagory1_2,
  //   catagory1_3,
  //   design_name1,
  //   skills1,

  //   ...

  //   catagoryN_1
  //   catagoryN_2
  //   catagoryN_3,
  //   design_nameN,
  //   skillsN
  // } = req.body;

  // somehow seperate them into JSON array of objects

  // ... other code
});

module.exports = router;
