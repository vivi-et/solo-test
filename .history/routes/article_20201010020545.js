const express = require('express');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const Article = require('../models/Article');
const User = require('../models/User');
const Relations = require('../models/Relations');

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

router.get('/', async (req, res) => {
  // const articles = await Article.findAll({ include: { User } });

  try {
    const articles = await Article.findAll({ include: User });
    console.log(JSON.stringify(articles, null, 2));
  } catch (error) {
    console.log(error);
  }

  // console.log(articles);

  // Object.keys(articles).forEach((key) => {
  //   articles[key].moments = moment(articles[key].createdAt).startOf('hour').fromNow();
  //   // console.log(key, obj[key].moments);
  // });
  // res.render('article/article.hbs', { articles });
});

router.get('/add', (req, res) => {
  res.render('article/article_add.hbs');
});

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
    } else if (!req.file) {
      tempArticle.image = './public/uploads/imgs/article/noimage.jpg';
      await Article.create(tempArticle);
      // req.file.image = 'noimage.jpg';
    } else {
      tempArticle.image = `./public/uploads/imgs/article/${req.file.image}`;
      await Article.create(tempArticle);
    }

    // console.log(req.file);
    // console.log();
    res.redirect('/article');
  });
});

module.exports = router;

SELECT `article`.`id`, `article`.`title`, `article`.`text`, `article`.`image`, `article`.`createdAt`, `article`.`updatedAt`, `article`.`userId`, `user`.`id` AS `user.id`, `user`.`username` AS `user.username`, `user`.`password` AS `user.password`, `user`.`email` AS `user.email`, `user`.`profile_img` AS `user.profile_img`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt` FROM `articles` AS `article` LEFT OUTER JOIN `users` AS `user` ON `article`.`userId` = `user`.`id