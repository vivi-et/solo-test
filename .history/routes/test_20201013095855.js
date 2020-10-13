const { response } = require('express');
const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;
  
  return res.send(data);

  try {
    // const jsonParse = JSON.parse(data);
    console.log('========================================');
    // console.log(jsonParse);
    console.log('========================================');
  } catch (error) {
    console.log(error);
    return res.send('error');
  }
});

module.exports = router;
