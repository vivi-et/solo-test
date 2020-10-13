const express = require('express');
const multer = require('multer');
const path = require('path');
const Article = require('../models/Article');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './public/uploads/imgs/article',
  filename: (req, file, cb) => {
    if (file) {
      cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
      );
      console.log(`fieldName : ${file.fieldname}`);
      console.log(`originalName : ${file.originalname}`);
    }
  },
});

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 10000 },
  fileFilter: (req, file, cb) => {
    if (file) { checkFileType(file, cb); }
  },
}).single('image');

// FileTypeChecker
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check Mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb('Error: Images Only');
}

router.get('/', (req, res) => {
  res.render('article/article.hbs');
});

router.get('/add', (req, res) => {
  res.render('article/article_add.hbs');
});

router.post('/add', (req, res) => {
  // const errors = [];

  console.log(req.body);
  console.log(req.file);
  const { title, text } = req.body;

  upload(req, res, async (err) => {
    if (!req.file) {
      req.file.image = null;
    }

    if (err) {
      console.log(err);
      res.render('article/article_add.hbs', { err });
    } else {
      await Article.create({
        title,
        text,
        image: `./uploads/imgs/article/${req.file.image}`,
      });
      // console.log(req.file);
      // console.log();
      res.redirect('/article');
    }
  });
});

module.exports = router;
