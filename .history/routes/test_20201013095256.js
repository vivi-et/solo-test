const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  console.log(data);

  JSON.parse(data.trim());
  return res.json(data);
});

module.exports = router;
