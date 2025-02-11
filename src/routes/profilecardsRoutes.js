const express = require('express');
const path = require('path');
const router = express.Router();

// Serve the questionnaire page
router.get('/questionnaire', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/quessionaire.html'));
});

// Handle questionnaire submission (POST request)
router.post('/submit-questionnaire', (req, res) => {
  // Process form data (optional: store in DB or session)
  console.log('Form Data:', req.body);

  // Redirect to the profile cards page
  res.redirect('/profile-cards');
});

// Serve the profile cards page
router.get('/profile-cards', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/Main2.html'));
});

module.exports = router;
