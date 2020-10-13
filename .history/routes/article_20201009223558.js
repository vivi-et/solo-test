const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('article/article.hbs');
});

module.exports = router;
