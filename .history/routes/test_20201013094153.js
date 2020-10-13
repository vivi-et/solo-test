const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);

  const redir = { redirect: '/login' };
  return res.json(redir);

  const data = req.body;
  return res.json(data);
});

module.exports = router;
