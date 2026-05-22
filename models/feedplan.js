const mongoose = require('mongoose');

const feedplanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },
  animalType: {
    type: String,
    required: true
  },
  feedItems: {
    type: [String],
    required: true
  },
  dailyQuantityKg: {
    type: Number,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'feed_plan'
});

module.exports = mongoose.model('FeedPlan', feedplanSchema);
