const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  imgUrl: String,
  imageId: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nickname: String,
  description: String,
  tags: {
    type: mongoose.Schema.Types.ObjectId,
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
