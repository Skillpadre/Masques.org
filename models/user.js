const mongoose = require('mongoose');

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
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'orders'}],
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
});

const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;