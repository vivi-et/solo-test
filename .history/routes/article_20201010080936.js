// =============================== /ARTICLE ROUTES ==============================
// =============================== /ARTICLE ROUTES ==============================
// =============================== /ARTICLE ROUTES ==============================

const express = require('express');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const Article = require('../models/Article');
const User = require('../models/User');
// const Relations = require('../models/Relations');

const router = express.Router();

// =============================== MULTER ==============================
const storage = multer.diskStorage({
  destination: './public/uploads/imgs/article',
  filename: (req, file, cb) => {
    if (file) {
      cb(
        null,
        `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`,
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
}).array('image');

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
// =============================== ROUTES ==============================

// =============================== GET / ==============================

router.get('/', async (req, res) => {
  // const articles = await Article.findAll({ include: { User } });
  let articles = '';
  try {
    articles = await Article.findAll({ include: User, raw: true, nest: true });
    // console.log(JSON.stringify(articles, null, 2));
    console.log(articles);
  } catch (error) {
    console.log(error);
  }

  Object.keys(articles).forEach((key) => {
    articles[key].moments = moment(articles[key].createdAt).startOf('hour').fromNow();

    console.log(key, articles[key]);
  });
  res.render('article/article.hbs', { articles });
});
// =============================== GET /ADD ==============================
router.get('/add', (req, res) => {
  res.render('article/article_add.hbs');
});

// =============================== GET /VIEW/:ID ==============================
router.get('/view/:id', async (req, res) => {
  const number = req.params.id;
  const article = await Article.findOne({ where: { id: number } });
  article.owner = false;

  if (req.user) {
    if (req.user.id === article.userId) {
      article.owner = true;
    }
  }

  res.render('article/article_view.hbs', { article });
});

// =============================== DELETE /VIEW/:ID ==============================

router.delete('/view/:id', auth.checkAuthenticated,  (req,res))

// =============================== POST /ADD ==============================
router.post('/add', (req, res) => {
  // const errors = [];

  upload(req, res, async (err) => {
    const { title, text } = req.body;

    const tempArticle = {
      title,
      text,
      image: '',
      userId: req.user.id,
    };

    if (err) {
      console.log(err);
      res.render('article/article_add.hbs', { err });
    } else if (!req.files) {
      tempArticle.image = 'noimage.jpg';
      await Article.create(tempArticle);
    } else {
      tempArticle.image = req.files;
      console.log(tempArticle.image);
      await Article.create(tempArticle);
    }

    res.redirect('/article');
  });
});

module.exports = router;
