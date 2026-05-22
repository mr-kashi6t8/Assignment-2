const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'customers'
});

module.exports = mongoose.model('Customer', customerSchema);
