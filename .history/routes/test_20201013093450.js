const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {

  console.log('aaaaaaaaaaaaaaaaaaaaa');
  console.log('aaaaaaaaaaaaaaaaaaaaa');
  console.log('aaaaaaaaaaaaaaaaaaaaa');
  console.log('aaaaaaaaaaaaaaaaaaaaa');
  console.log('aaaaaaaaaaaaaaaaaaaaa');
  

  console.log(req.body);

  res.send(req.body);
});

module.exports = router;
