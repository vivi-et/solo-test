const { response } = require('express');
const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  try {
    const jsonParse = JSON.parse(data);
    console.log(jsonParse);
    return response(data);
  } catch (error) {
    return response(error);
    console.log(error);
  }
});

module.exports = router;
