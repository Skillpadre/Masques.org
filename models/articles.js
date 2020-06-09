const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    priceUnit: Number,
    stock: Number,
    colors: Array,
    img: String,
    quality: String,
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});

const articleModel = new mongoose.model('articles', articleSchema);

module.exports = articleModel;