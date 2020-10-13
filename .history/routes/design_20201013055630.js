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

    //destructuring data
  const { 
    catagory1.1,
    catagory1.2,
    catagory1.3,
    design_name1,
    skills1,
    ...
    catagoryN.3 } = req.body;

    //



  

  // res.send(read);
});

module.exports = router;
