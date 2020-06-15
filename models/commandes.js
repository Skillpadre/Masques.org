const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
colors: String,
date_insert: Date,
matiere: String,
model: String,
priceUnit: Number,
quality: String,
quantity: Number,
sellerId: String
});

const commandeModel = new mongoose.model('commandes', commandeSchema);

module.exports = commandeModel;