const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4, // Generates a unique ID
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); //optional to store change timestamp of user

module.exports = mongoose.model('User', userSchema);