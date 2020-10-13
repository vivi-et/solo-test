const express = require('express');
const Test = require('../models/Test');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  Test.create({ data });

  return res.send(data);
});

router.get('/', (req, res) => {
  Test.findAll().then((result) => {
    console.log('=====================================================');
    console.log(result[1]);
    console.log('=====================================================');
    res.render('test.hbs', { data: result });
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
