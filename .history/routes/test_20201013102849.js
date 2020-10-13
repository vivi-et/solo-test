const { response } = require('express');
const express = require('express');
const { get } = require('lodash');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  console.log(req.body);

  const { data } = req.body;

  return res.send(data);
});


router.get('/', (req,res)=>{
  const a = "[{"name":"category1_1","value":"A1"},{"name":"category1_2","value":"1"},{"name":"category1_3","value":"1"},{"name":"design_name1","value":"11111111111"},{"name":"skills1","value":"1"},{"name":"skills1","value":"4"}]";
  const data = JSON.parse(a);

  res.render('test.hbs', {data})
})

module.exports = router;
