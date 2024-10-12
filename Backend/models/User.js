// models/User.js

const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
