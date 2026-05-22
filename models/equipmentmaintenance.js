const mongoose = require('mongoose');

const equipmentmaintenanceSchema = new mongoose.Schema({
  equipment: {
    type: String,
    required: true
  },
  lastServiceDate: {
    type: Date,
    required: true
  },
  nextServiceDue: {
    type: Date,
    required: true
  },
  technician: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'equipment_maintainence'
});

module.exports = mongoose.model('EquipmentMaintenance', equipmentmaintenanceSchema);
