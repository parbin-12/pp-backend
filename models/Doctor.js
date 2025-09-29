const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  experience: { type: Number, required: true },
  availableDays: [{ type: String }],  // e.g. ["Monday", "Wednesday"]
  photo: { type: String }, // path to uploaded photo
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
