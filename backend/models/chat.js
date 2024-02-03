const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  // chatid: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: String,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
