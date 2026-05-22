const mongoose = require('mongoose');

const quarantinelogSchema = new mongoose.Schema({
  animalTag: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  reason: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'quarantine_logs'
});

module.exports = mongoose.model('QuarantineLog', quarantinelogSchema);
