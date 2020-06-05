var express = require('express');
var router = express.Router();

let articleModel = require('../models/articles');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// route qui ajoute un nouvel article créé par le fabricant

router.post('/articles', async function (req, res, next) {
  let articles
  let newArticles = new articleModel({
    modele: req.body.modèle,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    color: req.body.couleur,
    img: req.body.image,
    quality: req.body.qualité

  });
  articles = await newArticles.save();



  res.json({ articles });
});

module.exports = router;