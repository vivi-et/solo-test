const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  console.log(data);

  let test1 = JSON.parse(data.trim());
  return res.json(test1);
});

module.exports = router;
