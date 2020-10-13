const { json } = require('body-parser');
const express = require('express');
const Test = require('../models/Test');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  // console.log(req.body);

  const { data } = req.body;

  console.log(data);

 const one = JSON.parse(data);
 console.log(one);
 

  // Test.create({ data });

  return res.send(data);
});

router.get('/', (req, res) => {
  Test.findAll().then((result) => {
    console.log('=====================================================');
    console.log(result);
    console.log('=====================================================');
    res.render('test.hbs', { data: result });
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
