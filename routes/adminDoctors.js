const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/doctors'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create doctor (POST)
router.post('/doctors', upload.single('photo'), async (req, res) => {
  try {
    const doctor = new Doctor({
      name: req.body.name,
      specialization: req.body.specialization,
      email: req.body.email,
      phone: req.body.phone,
      experience: req.body.experience,
      availableDays: req.body.availableDays.split(','),
      photo: req.file ? req.file.path : null,
    });
    await doctor.save();
    res.json({ message: 'Doctor added successfully', doctor });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all doctors (GET)
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get doctor by ID (GET)
router.get('/doctors/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update doctor (PUT)
router.put('/doctors/:id', upload.single('photo'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      specialization: req.body.specialization,
      email: req.body.email,
      phone: req.body.phone,
      experience: req.body.experience,
      availableDays: req.body.availableDays ? req.body.availableDays.split(',') : [],
    };

    if (req.file) {
      updateData.photo = req.file.path;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    res.json({ message: 'Doctor updated successfully', doctor });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete doctor (DELETE)
router.delete('/doctors/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
