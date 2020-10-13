const express = require('express');
const Notice = require('../models/Notice');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('notice.hbs');
});

router.get('/add', (req, res) => {
  res.render('notice_add.hbs');
});

router.post('/add', (req, res) => {
  const { title } = req.body;
  const { text } = req.body;

  Notice.create({
    title,
    text,
    userId: req.user.id,
  });
  return res.redirect('/');
});

module.exports = router;
