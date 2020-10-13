const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('notice.hbs');
});

router.get('/add', (req, res) => {
  res.render('notice_add.hbs');
});

module.exports = router;
