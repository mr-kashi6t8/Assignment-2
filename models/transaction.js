const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'transactions'
});

module.exports = mongoose.model('Transaction', transactionSchema);
