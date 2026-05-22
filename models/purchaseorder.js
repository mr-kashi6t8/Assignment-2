const mongoose = require('mongoose');

const purchaseorderSchema = new mongoose.Schema({
  supplier: {
    type: String,
    required: true
  }, // References Supplier by supplierName
  item: {
    type: String,
    required: true
  }, // References Inventory by itemName
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'purchase_orders'
});

module.exports = mongoose.model('PurchaseOrder', purchaseorderSchema);
