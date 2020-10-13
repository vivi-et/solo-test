const { response } = require('express');
const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  return res.send(data);
});

module.exports = router;
