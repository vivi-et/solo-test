const { json } = require('body-parser');
const express = require('express');
const Test = require('../models/Test');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  // console.log(req.body);

  const { data } = req.body;

  Test.create({ data });

  return res.send(data);
});

router.get('/', (req, res) => {
  Test.findAll().then((data) => {

    

    res.render('test.hbs', { data });
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
