const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure upload folders exist
const uploadDirs = ['uploads', 'uploads/doctors', 'uploads/ads'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
const doctorRoutes = require('./routes/doctors');
const adminDoctorRoutes = require('./routes/adminDoctors');
const chatbotRoutes = require('./routes/chatbot');
const feedbackRoutes = require('./routes/feedback');
const adminAdsRoutes = require('./routes/adminAds');

app.use('/doctors', doctorRoutes);             // Public GET
app.use('/admin', adminDoctorRoutes);          // Admin CRUD doctors
app.use('/api/chatbot', chatbotRoutes);        // Chatbot API
app.use('/api/feedback', feedbackRoutes);      // Feedback API
app.use('/admin', adminAdsRoutes);             // Admin ads upload

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
