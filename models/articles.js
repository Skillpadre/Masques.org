const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    modele: String,
    description: String,
    price: Number,
    stock: Number,
    color: String,
    img: String,
    quality: String
});

const articleModel = new mongoose.model('articles', articleSchema);

module.exports = articleModel;