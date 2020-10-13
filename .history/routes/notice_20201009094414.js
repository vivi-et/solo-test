const express = require('express');
const moment = require('moment');
const Notice = require('../models/Notice');

const router = express.Router();

router.get('/', async (req, res) => {
  const notices = await Notice.findAll();

  // for (k in notices) {
  //   console.log(notices[k].createdAt);
  // }
  const obj = notices;

  Object.keys(notices).forEach((key) => {
    notices[key].moments = moment(notices[key].createdAt).format("MMM Do YY");
    console.log(key, obj[key].moments);
  });
  // console.log(notices);

  res.render('notice.hbs', { notices });
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
