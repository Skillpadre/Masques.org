var express = require('express');
var router = express.Router();

let articleModel = require('../models/articles');
let userModel = require('../models/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// route qui ajoute un nouvel article créé par le fabricant

router.post('/add-article/:token', async function (req, res, next) {
  let user = await userModel.findOne({token: req.params.token})

  console.log(req.params.token);
  console.log(req.body);
  let article;
  let result = false;

  let newArticle = new articleModel({
    description: req.body.description,
    priceUnit: req.body.priceUnit,
    stock: req.body.stock,
    colors: req.body.colors,
    img: req.body.image,
    quality: req.body.quality,
    sellerId: user._id

  });
  article = await newArticle.save();

  if(article.stock) {
    result = true;
  }

  res.json({ article, result });
});



router.get('/article-list', async function(req, res, next) {

  var article = await articleModel.find()

  res.json({article})
});

router.get('/articleId/:id', async function(req, res){
  let articleId = await articleModel.findById(req.params.id);
  console.log(articleId);
  res.json(articleId);
});

module.exports = router;