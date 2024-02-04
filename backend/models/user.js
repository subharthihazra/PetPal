const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: String,
  location: String,
  city: String,
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
