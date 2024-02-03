const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  type: String,
  breed: String,
  gender: {
    type: String,
    enum: ["male", "female", "other", "unknown"],
    default: "unknown",
  },
  age: Number,
  personality: String,
  health: String,
  stray: Boolean,
  city : {
    type : String,
    required : true,
  },
  weight : {
    type : String,
  required : true,
  }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = {Tag};
