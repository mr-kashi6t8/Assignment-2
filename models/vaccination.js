const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  animalTag: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  vaccine: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'vaccination'
});

module.exports = mongoose.model('Vaccination', vaccinationSchema);
