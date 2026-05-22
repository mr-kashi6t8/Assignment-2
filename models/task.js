const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  }, // References Employee by name
  barn: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'tasks'
});

module.exports = mongoose.model('Task', taskSchema);
