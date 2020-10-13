const express = require('express');
const Test = require('../models/Test');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  Test.create(data);

  const { data } = req.body;

  return res.send(data);
});

router.get('/', (req, res) => {

});

module.exports = router;
