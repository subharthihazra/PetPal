const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tagid: {
    type: String,
    unique: true,
    required: true,
  },
  type: String,
  breed: String,
  gender: {
    type: String,
    enum: ["male", "female", "other", "unknown"],
    default: "unknown",
  },
  age: Number,
  personality: [String],
  health: [String],
  stray: Boolean,
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
