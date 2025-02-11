const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true }, // Explicitly define it
  address: { type: String, required: true },
  rent: { type: Number, required: true },
  description: { type: String },
  availableSpacesForRoommates: { type: Number, required: true },
  photos: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
