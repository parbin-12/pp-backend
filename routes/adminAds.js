const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Ad = require('../models/Ads');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/ads'); // folder where ads images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});
const upload = multer({ storage });

// POST → Upload ad
router.post('/ads', upload.single('image'), async (req, res) => {
  try {
    const ad = new Ad({
      title: req.body.title,
      link: req.body.link,
      image: req.file ? req.file.path.replace(/\\/g, "/") : null, // replace backslashes
    });
    await ad.save(); // save to MongoDB
    res.json({ message: 'Ad uploaded successfully', ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET → Fetch all ads
router.get('/ads', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
