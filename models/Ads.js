const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: { type: String },
  link: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', AdSchema);
