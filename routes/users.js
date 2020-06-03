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

module.exports = router;
