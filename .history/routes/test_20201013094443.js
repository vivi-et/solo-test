const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  const jsonParse = JSON.parse(data);
  console.log(jsonParse);
  return res.json(jsonParse);
});

module.exports = router;
