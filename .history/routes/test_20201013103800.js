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

});

module.exports = router;
