const multer = require('multer');
const path = require('path');

// Doctor photos
const doctorStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/doctors');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Ads images
const adsStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/ads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadDoctor = multer({ storage: doctorStorage });
const uploadAd = multer({ storage: adsStorage });

module.exports = { uploadDoctor, uploadAd };
