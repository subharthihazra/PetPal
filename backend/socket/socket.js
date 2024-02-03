// require('dotenv').config()
const { Server: socketServer } = require("socket.io");
const Chat = require("../models/chat");

const createSocketServer = (port) => {
  const io = new socketServer(port, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id, "Joined!");
  });
};

module.exports = createSocketServer;
