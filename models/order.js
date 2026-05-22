const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  }, // References Customer by name
  product: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'orders'
});

module.exports = mongoose.model('Order', orderSchema);
