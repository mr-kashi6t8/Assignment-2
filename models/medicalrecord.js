const mongoose = require('mongoose');

const medicalrecordSchema = new mongoose.Schema({
  animalTag: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  diagnosis: {
    type: String,
    required: true
  },
  medicine: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  vetName: {
    type: String,
    required: true
  },
  quarantine: {
    type: Boolean,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'medical_records'
});

module.exports = mongoose.model('MedicalRecord', medicalrecordSchema);
