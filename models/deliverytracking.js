const mongoose = require('mongoose');

const deliverytrackingSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  }, // References Order by custom ID
  vehicle: {
    type: String,
    required: true
  }, // References Vehicle by vehicleNumber
  driver: {
    type: String,
    required: true
  }, // References Employee by name
  currentLocation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'delivery_tracking'
});

module.exports = mongoose.model('DeliveryTracking', deliverytrackingSchema);
