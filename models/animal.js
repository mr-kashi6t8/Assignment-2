const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  tagNumber: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  currentStatus: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  weightHistory: {
    type: [{
    date: Date,
    weight: Number
  }]
  },
}, { 
  timestamps: true,
  collection: 'animals'
});

module.exports = mongoose.model('Animal', animalSchema);
