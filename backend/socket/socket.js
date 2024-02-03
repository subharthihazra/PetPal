// require('dotenv').config()
const { Server: socketServer } = require("socket.io");
const Chat = require("../models/chat");

const createSocketServer = (port) => {
  const io = new socketServer(port, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  let activeConnections = [];

  function getReceiverSocketId(receiverId) {
    let d = activeConnections.filter((x) => x.receiverId === receiverId);
    if (d && d.length !== 0) {
      return d.socketId;
    } else {
      return null;
    }
  }

  function getReceiverId(socketId) {
    let d = activeConnections.filter((x) => x.socketId === socketId);
    if (d && d.length !== 0) {
      return d.receiverId;
    } else {
      return null;
    }
  }

  io.on("connection", (socket) => {
    console.log(socket.id, "Joined!");

    socket.on("connection", () => {
      //
    });

    socket.on("registeruser", async (email, cb) => {
      socket.email = email;
      let user = activeConnections.filter((x) => x?.email === email);
      if (user) {
        activeConnections = activeConnections.map((x) =>
          x?.email === email ? { email, socketId: socket.id } : x
        );
      } else {
        activeConnections.push({ socketId: socket.id, email });
      }
      cb();
      let result = await Chat.find(
        $or[
          ({
            from: socket.email,
            to: receiverId,
          },
          {
            to: socket.email,
            from: receiverId,
          })
        ]
      ).sort({ timestamp: -1 });

      socket.to(socket.id).emit(
        "loadhist",
        result.map((x) => ({
          receiverId: x.to,
          senderId: x.from,
          own: x.from === getReceiverId(socket.email),
          timestamp: x.timestamp,
          message: x.message,
        }))
      );
    });

    socket.on("startchat", (receiverId) => {
      let id = getReceiverSocketId(receiverId);
      if (id) socket.join(id);
    });

    socket.on("disconnecting", () => {
      //
    });
    socket.on("sendmessage", (receiverId, message) => {
      (async () => {
        storeMsg(receiverId, socket.email, message);
      })();
      let id = getReceiverId(receiverId);
      if (id) socket.to(id).emit("getmessage", socket.email, message);
    });
  });
};

function storeMsg(receiverId, ownId) {
  Chat.create({ from: ownId, to: receiverId, message: message });
}

module.exports = createSocketServer;
