const mongoose = require('mongoose');

const productionlogSchema = new mongoose.Schema({
  animalId: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  type: {
    type: String,
    required: true
  },
  records: {
    type: {
    morningYield: Number,
    eveningYield: Number,
    fatPercentage: Number,
    proteinPercentage: Number
  },
    required: true
  },
  recordedDate: {
    type: Date,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'production_logs'
});

module.exports = mongoose.model('ProductionLog', productionlogSchema);
