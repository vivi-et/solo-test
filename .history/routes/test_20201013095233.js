const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  console.log(data);

  data.trim(data);
  return res.json(data);
});

module.exports = router;
