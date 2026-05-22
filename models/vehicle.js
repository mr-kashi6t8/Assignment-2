const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  driver: {
    type: String,
    required: true
  }, // References Employee by name
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'vehicle'
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
