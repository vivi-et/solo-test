const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {


  console.log(req.body);

  res.send('successaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
});

module.exports = router;
