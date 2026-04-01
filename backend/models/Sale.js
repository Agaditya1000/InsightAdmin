const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    default: 'Anonymous'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', SaleSchema);
