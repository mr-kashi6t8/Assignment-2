const mongoose = require('mongoose');

const breedingrecordSchema = new mongoose.Schema({
  animalTag: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  method: {
    type: String,
    required: true
  },
  inseminationDate: {
    type: Date,
    required: true
  },
  expectedDelivery: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'breeding_records'
});

module.exports = mongoose.model('BreedingRecord', breedingrecordSchema);
