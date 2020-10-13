const { response } = require('express');
const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  try {
    const jsonParse = JSON.parse(data);
    console.log('========================================');
    console.log(jsonParse);
    console.log('========================================');
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.send('error');
  }
});

module.exports = router;
