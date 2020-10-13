const express = require('express');
const Test = require('../models/Test');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  let { data } = req.body;

  data = JSON.stringify(data);

  Test.create({ data });

  return res.send(data);
});

router.get('/', (req, res) => {

});

module.exports = router;
