const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number
});

//Commandes coté Acheteur
const commandeSchema = new mongoose.Schema({
    articles: Array,
    quantity: Number,
    totalPrice: Number,
    sellerId: String,
    livraison: String,
    date_insert: Date
});

//Commandes coté Vendeur
const orderSchema = new mongoose.Schema({
    articles: Object,
    quantity: Number,
    totalPrice: Number,
    sellerId: String,
    livraison: String,
    date_insert: Date
});


const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    token: String,
    salt: String,
    date_inscription: Date,
    lastName: String,
    firstName: String,
    address: String,
    city: String,
    zip_code: String,
    tel: String,
    avatar: String,
    coordinates: Array, // [longitude, latitude]
    orders: [orderSchema],
    commandes: [commandeSchema],
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
});

const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;