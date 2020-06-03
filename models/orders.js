const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    client: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    total: Number,
    date_insert: Date,
    shipping_cost: Number,
    status_payment: String,
    date_payment: Date,
    status_shipment: Boolean,
    date_shipment: Date,
    delivery_address: String,
    delivery_city: String,
    delivery_zipcode: String,
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
});

const orderModel = new mongoose.model('orders', orderSchema);

module.exports = orderModel;