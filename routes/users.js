var express = require('express');
var router = express.Router();
let uid2 = require("uid2");
let SHA256 = require("crypto-js/sha256");
let encBase64 = require("crypto-js/enc-base64");
let userModel = require('../models/user');
var cloudinary = require('cloudinary').v2;
var uniqid = require('uniqid');
var fs = require('fs');


//CLOUDINARY
cloudinary.config({ 
  cloud_name: 'dwwdbvi9e', 
  api_key: '756948762887978', 
  api_secret: 'LaUNGqX_cqPTqDgOutrzmC_Y8YQ' 
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Route Sign Up
router.post('/signup', async function(req, res) {
  let result;
  let error = [];
  let user;


  // Test si l'email n'est pas deja utilisé
  let isEmailUsed = await userModel.findOne({email: req.body.email})
  if (isEmailUsed) {
    result = false;
    error.push('Email déjà utilisé');
  }

  // Test si le username n'est pas déjà use
  let isUsernameUsed = await userModel.findOne({username: req.body.username})
  if(isUsernameUsed){
    result = false;
    error.push("Nom d'utilisateur déjà utilisé");
  }
  
  // On test si les champs sont remplis
  if (req.body.email === '' || req.body.password === '' || req.body.username === '') {
    result = false;
    error.push('Champs vides');
  }

  if(error.length === 0) {
    let salt = uid2(32);
    let newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      salt: salt,
      password: SHA256(req.body.password + salt).toString(encBase64),
      token: uid2(32),
      avatar: "https://res.cloudinary.com/dmvudxnlz/image/upload/v1591715224/noavatar_wceh4i.png",
      date_inscription: new Date(),
    });
    user = await newUser.save();
    if(user)
      result = true;
  }

  res.json({ result, error, user })
});


// Route SIGN IN
router.post('/signin', async function(req, res){
  let result = false;
  let error = [];

  if (req.body.email === '' || req.body.password === '') {
    error.push('Vérifiez les champs de saisie');
  }

  let user = await userModel.findOne({email: req.body.email})
  if (user) {
    let hash = SHA256(req.body.password + user.salt).toString(encBase64);

    if(hash === user.password)
      result = true;
    else {
      error.push("MDP invalide")
      user = null;
    }

  } else {
    error.push("Ce compte n'existe pas");
  }

  res.json({ result, error, user });
});

// Route Changement info perso
router.post('/update-info/:token', async function(req, res){
  let user = await userModel.findOne({token: req.params.token});

  if(req.body.prenom)
    user.firstName = req.body.prenom;

  if(req.body.nom)
    user.lastName = req.body.nom;
  
  if(req.body.telephone)
    user.tel = req.body.telephone;

  if(req.body.adresse)
    user.address = req.body.adresse;

  if(req.body.zipcode)
    user.zip_code = req.body.zipcode;

  if(req.body.city)
    user.city = req.body.city;

  user = await user.save();
  res.json({user});
});


router.get('/loadinfo/:token', async function(req, res){
  let user = await userModel.findOne({token: req.params.token});
  res.json({user});
});

router.post('/add-avatar/:token', async function(req, res){
  
  let user = await userModel.findOne({token: req.params.token});

  
  //ENVOI TEMPORAIRE DE LA PHOTO DANS UN REPERTOIRE LOCAL
  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName);
  console.log('test1')
  
  //SI LE RESULTAT EST VIDE LA SAUVEGARDE A BIEN ETE FAITE
  if(!resultCopy) {
    //ENVOI VERS CLOUDINARY
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
  
    user.avatar = resultCloudinary.url;
    user = await user.save();
   
    res.json({url : resultCloudinary.url, user : user});
    
  }else{
    res.json({error: resultCopy, user});
    console.log('error')
  }

 //SUPPRESSION DE L'IMAGE STOCKER TEMPORAIREMENT
 fs.unlinkSync(pictureName);

});




module.exports = router;
