// =============================== DESIGN ROUTES ==============================
// =============================== DESIGN ROUTES ==============================
// =============================== DESIGN ROUTES ==============================

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const auth = require('../config/auth');
const User = require('../models/User');
const fs = require('fs');

// =============================== MULTER ==============================
const storage = multer.diskStorage({
  destination: './public/uploads/imgs/design',
  filename: (req, file, cb) => {
    if (file) {
      cb(null, `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`);
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

router.get('/', (req, res) => {
  res.render('design/design_home.hbs');
});

router.post('/add', (req, res) => {
  res.send(req.body);
  // destructuring data
  // const {
  //   catagory1_1,
  //   catagory1_2,
  //   catagory1_3,
  //   design_name1,
  //   skills1,

  //   ...

  //   catagoryN_1
  //   catagoryN_2
  //   catagoryN_3,
  //   design_nameN,
  //   skillsN
  // } = req.body;

  // somehow seperate them into JSON array of objects

  // ... other code
});

router.post('/test', (req, res) => {
  upload(req, res, async (err) => {
    const { data } = req.body;

    console.log('===============================================');
    console.log('===============================================');
    // console.log(data);
    let a = req.body.mainformval;
    let b = JSON.parse(a);
    console.dir(b);
    
    // req.body.formval = b;
    // console.log(req.body);
  
    console.log('===============================================');
    console.log('===============================================');

    fs.writeFileSync(`./${Date.now}_a.txt`, a);
    return res.send(a);
  });
});

module.exports = router;
