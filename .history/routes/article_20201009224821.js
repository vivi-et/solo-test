const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('article/article.hbs');
});

router.get('/add', (req, res) => {
  res.render('article/article_add.hbs');
});

module.exports = router;
