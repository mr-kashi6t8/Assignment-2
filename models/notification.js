const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'notifications'
});

module.exports = mongoose.model('Notification', notificationSchema);
