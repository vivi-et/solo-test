const { response } = require('express');
const express = require('express');
const { get } = require('lodash');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  return res.send(data);
});

router.get('/', (req, res) => {

});

module.exports = router;
