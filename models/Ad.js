const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String },
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Ad", AdSchema);
