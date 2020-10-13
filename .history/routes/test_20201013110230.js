const { json } = require('body-parser');
const express = require('express');
const Test = require('../models/Test');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  // console.log(req.body);

  const { data } = req.body;

  const stripOuter = data[0];

  console.log(stripOuter);
  // Test.create({ data });

  return res.send(stripOuter);
});

router.get('/', (req, res) => {
  Test.findAll().then((data) => {
    // data[0].data.forEach((element) => {
    //   console.log(element);
    // });
    console.log(data);

    res.render('test.hbs', { data });
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
