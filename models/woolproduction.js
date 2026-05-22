const mongoose = require('mongoose');

const woolproductionSchema = new mongoose.Schema({
  animalTag: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  woolWeightKg: {
    type: Number,
    required: true
  },
  qualityGrade: {
    type: String,
    required: true
  },
  shearingDate: {
    type: Date,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'wool_production'
});

module.exports = mongoose.model('WoolProduction', woolproductionSchema);
