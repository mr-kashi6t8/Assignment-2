const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    required: true
  },
  generatedDate: {
    type: Date,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'reports'
});

module.exports = mongoose.model('Report', reportSchema);
