const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  petid: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrl: String,
  imageId: String,
  owner: {
    type: String,
    required: true,
  },
  teams: String,
  nickname: String,
  description: String,
  tags: {
    type: String,
    unique: true,
  },
  loves: {
    type: Number,
    default: 0,
  },
  adopted: {
    type: Boolean,
    default: false,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = { Pet };
