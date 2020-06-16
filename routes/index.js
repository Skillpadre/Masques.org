var express = require('express');
var router = express.Router();

let articleModel = require('../models/articles');
let userModel = require('../models/user')

var cloudinary = require('cloudinary').v2;
var uniqid = require('uniqid');
var fs = require('fs');

const stripe = require('stripe')('sk_test_fPEUR0HzUgzfHM8jCQzMKPD600ffNP4cbh');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// route qui ajoute un nouvel article créé par le fabricant

router.post('/add-article/:token', async function (req, res, next) {
  let user = await userModel.findOne({ token: req.params.token })

  let article;
  let result = false;
  let date = new Date();

  let newArticle = new articleModel({
    description: req.body.description,
    priceUnit: req.body.priceUnit,
    stock: req.body.stock,
    colors: req.body.colors,
    material: req.body.matiere,
    model: req.body.model,
    img: req.body.image,
    quality: req.body.quality,
    date_insert: date,
    sellout: false,
    sellerId: user._id,
    inscription: req.body.inscription,
    logo: req.body.logo,
  });

  article = await newArticle.save();

  user.articles.push(article);
  await user.save();

  if (article.stock) {
    result = true;
  }

  res.json({ article, result });
});

router.get('/article-list', async function (req, res, next) {

  var articles = await articleModel.find()
  let sellers = [];
  for (let i = 0; i < articles.length; i++) {
    let user = await userModel.findById(articles[i].sellerId);
    sellers.push(user);
  }

  res.json({ articles, sellers });
});

router.get('/articleId/:id', async function (req, res) {
  let article = await articleModel.findById(req.params.id);
  let seller = await userModel.findById(article.sellerId)

  res.json({ article, seller });
});



router.get('/new-basket', async function (req, res) {
  const product = await stripe.products.create({
    name: "Article id : " + req.query.id,
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount_decimal: req.query.price * 100,
    currency: 'EUR',
  });
  res.json({ product, price })
})


router.get('/valid-order', async function (req, res) {

  var sellout = false

  var lessQuantity = req.query.quantity

  var article = await articleModel.findById(req.query.id)

  var stock = article.stock

  var newStock = stock - lessQuantity
  if(newStock <= 0){
    sellout = true
  }

  var updateStock = await article.updateOne(
    { stock: newStock,
      sellout : sellout
    }
    

  );
  article = await articleModel.findById(req.query.id)

console.log(article)
  res.json({ updateStock})
})

router.post('/add-image', async function(req, res){
  
  //ENVOI TEMPORAIRE DE LA PHOTO DANS UN REPERTOIRE LOCAL
  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.image.mv(pictureName);
  
  //SI LE RESULTAT EST VIDE LA SAUVEGARDE A BIEN ETE FAITE
  if(!resultCopy) {
    //ENVOI VERS CLOUDINARY
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
  
   
    res.json({url : resultCloudinary.url});
  }else{
    res.json({error: resultCopy, article});
  }

 //SUPPRESSION DE L'IMAGE STOCKER TEMPORAIREMENT
 fs.unlinkSync(pictureName);

});

router.post('/add-order/:token', async function (req, res, next) {
  let acheteur = await userModel.findOne({ token: req.params.token })
   var articles = []     
  
   for(var i =0; i < req.body.orders.length; i++){
      var vendeur= await userModel.findById(req.body.orders[i].sellerId)

      vendeur.orders.push({
        articles: req.body.orders[i],
        quantity: req.body.quantity,
        totalPrice: req.body.total,
        livraison: req.body.livraison
      })
      await vendeur.save();
        articles.push(req.body.orders[i])

  }
acheteur.commandes.push(
{
  articles: articles,
  quantity: req.body.quantity,
  totalPrice: req.body.total,
  livraison: req.body.livraison
 }

)
await acheteur.save();

res.json({acheteur, vendeur});
});


module.exports = router;