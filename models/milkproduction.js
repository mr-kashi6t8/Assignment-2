const mongoose = require('mongoose');

const milkproductionSchema = new mongoose.Schema({
  animalTag: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  morningMilk: {
    type: Number,
    required: true
  },
  eveningMilk: {
    type: Number,
    required: true
  },
  fatPercentage: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'milk_production'
});

module.exports = mongoose.model('MilkProduction', milkproductionSchema);
