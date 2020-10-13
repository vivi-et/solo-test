const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  try {
    const jsonParse = JSON.parse(data);
    console.log(jsonParse);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
