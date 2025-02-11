const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');


const router = express.Router();
//signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 8 || password.length > 19) {
        return res
          .status(400)
          .json({ message: 'Password must be greater than 8 and less than 20 characters.' });
      }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.sendFile(path.join(__dirname, '../views/success.html'));
  } catch (err) {
    res.status(500).json({ message: 'Error saving user', error: err });
  }
});

//login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html')); 
});

//login

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare provided password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Login successful
    res.sendFile(path.join(__dirname, '../views/profile.html')); // Redirect to a success page or dashboard
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err });
  }
});


module.exports = router;