const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    priceUnit: Number,
    stock: Number,
    colors: Array,
    material: Array,
    model: Array,
    inscription: Array,
    logo: Array,
    img: String,
    quality: String,
    date_insert: Date,
    date_end: Date,
    sellout: Boolean,
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    designText: String,
    designImg: String,
    urlImg: String
});

const articleModel = new mongoose.model('articles', articleSchema);

module.exports = articleModel;