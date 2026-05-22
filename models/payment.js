const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  }, // References Customer by name
  orderId: {
    type: String,
    required: true
  }, // References Order by custom ID
  method: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'payments'
});

module.exports = mongoose.model('Payment', paymentSchema);
