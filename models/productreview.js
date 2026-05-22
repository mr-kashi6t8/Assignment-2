const mongoose = require('mongoose');

const productreviewSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  }, // References Customer by name
  product: {
    type: String,
    required: true
  }, // References Animal by tagNumber / _id
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
}, { 
  timestamps: true,
  collection: 'product_reviews'
});

module.exports = mongoose.model('ProductReview', productreviewSchema);
