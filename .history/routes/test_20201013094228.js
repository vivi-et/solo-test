const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  
  const data = req.body;
  return res.json(data);
});

module.exports = router;
