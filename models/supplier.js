const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'suppliers'
});

module.exports = mongoose.model('Supplier', supplierSchema);
