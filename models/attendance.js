const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  }, // References Employee by name
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'attendance'
});

module.exports = mongoose.model('Attendance', attendanceSchema);
