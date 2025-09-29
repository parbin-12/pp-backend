const express = require('express');
const router = express.Router();

// POST /api/chatbot
router.post('/chatbot', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Please send a message." });

  let reply = "Sorry, I didn't understand that.";

  const lower = message.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi")) {
    reply = "Hello! How can I help you today?";
  } else if (lower.includes("doctor")) {
    reply = "We have several expert doctors. You can check the Doctors section.";
  } else if (lower.includes("appointment")) {
    reply = "You can book an appointment directly from the Doctors section.";
  }

  res.json({ reply });
});

module.exports = router;
