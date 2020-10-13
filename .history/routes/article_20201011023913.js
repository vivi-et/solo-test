// =============================== /ARTICLE ROUTES ==============================
// =============================== /ARTICLE ROUTES ==============================
// =============================== /ARTICLE ROUTES ==============================

const express = require('express');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const { Op } = require('sequelize');
const Article = require('../models/Article');
const User = require('../models/User');
const auth = require('../config/auth');
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
      // console.log(`fieldName : ${file.fieldname}`);
      // console.log(`originalName : ${file.originalname}`);
    }
  },
});

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 10000 },
  fileFilter: (req, file, cb) => {
    if (file) {
      checkFileType(file, cb);
    }
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

// =============================== PAGINATION ==============================

// =============================== GET PAGINATION ==============================
router.get('/', (req, res) => {
  res.redirect('/article/page/1');
});

router.get('/:pageNumber/', async (req, res) => {
  const pageNumber = 1;
  const pageSize = 5;

  // article/?pageNumber=2&pageSize=5

  // const articles = await Article.findAll({ include: { User } });
  let articles = '';
  try {
    articles = await Article
      .findAll(
        {
          include: User,
          raw: true,
          nest: true,
          limit: pageSize,
          offset: ((pageNumber - 1) * pageSize),
        },
      );
    // console.log(JSON.stringify(articles, null, 2));
    // console.log(articles);
  } catch (error) {
    console.log(error);
  }

  Object.keys(articles).forEach((key) => {
    articles[key].moments = moment(articles[key].createdAt)
      .startOf('hour')
      .fromNow();

    // console.log(key, articles[key]);
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
// =============================== GET /EDIT/:ID ==============================
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const article = await Article.findOne({ where: { id } });
  article.owner = false;

  // console.log('userid: ', req.user.id);
  // console.log('articleID : ', article.userId);

  if (req.user) {
    if (userId === article.userId) {
      return res.render('article/article_edit.hbs', { article });
    }
  }
  return res.send('not authorized');
});

// =============================== PUT /EDIT/:ID ==============================

router.put('/edit/:id', (req, res) => {
  upload(req, res, async (err) => {
    const { id, title, text } = req.body;
    const oldArticle = await Article.findOne({ where: { id } });

    const oldImage = oldArticle.image;

    const tempArticle = {
      title,
      text,
      image: oldImage,
      userId: req.user.id,
    };

    if (err) {
      console.log(err);
      res.render('article/article_add.hbs', { err });
    } else if (req.files.length < 1) {
      tempArticle.image = oldImage;
      await Article.create(tempArticle);
    } else {
      tempArticle.image = req.files;
      // console.log(tempArticle.image);
      await Article.create(tempArticle);
    }

    res.redirect('/article');
  });
});

// =============================== DELETE /VIEW/:ID ==============================

router.delete('/:id', auth.checkAuthenticated, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const article = await Article.findOne({ where: { id, userId } });
  if (req.user.id === article.userId) {
    await Article.destroy({ where: { id, userId } });
    return res.redirect('/article');
  }
  return res.send('not authenticated');
});

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
      await Article.create(tempArticle);
    }

    res.redirect('/article');
  });
});

module.exports = router;
