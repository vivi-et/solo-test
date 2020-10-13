const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  const data = req.body;
  res.redirect('test.hbs', { data });
});

module.exports = router;
