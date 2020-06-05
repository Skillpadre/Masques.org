var express = require('express');
var router = express.Router();
let uid2 = require("uid2");
let SHA256 = require("crypto-js/sha256");
let encBase64 = require("crypto-js/enc-base64");

let userModel = require('../models/user');

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
  console.log(user);
  res.json({user});
});
module.exports = router;
