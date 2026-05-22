const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  }, // References Employee by name
  month: {
    type: String,
    required: true
  },
  baseSalary: {
    type: Number,
    required: true
  },
  overtime: {
    type: Number,
    required: true
  },
  finalSalary: {
    type: Number,
    required: true
  },
  advance: {
    type: Number,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'payroll'
});

module.exports = mongoose.model('Payroll', payrollSchema);
