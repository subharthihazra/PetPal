import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import Chatting from "@/components/Chatting";
import io from "socket.io-client";

function Chats() {
  const socket = io("http://localhost:8000");

  const userId = "5gh964g4j"; // tmp user id
  const receiverId = "4t5g5rg5"; // tmp other chat user id
  const [conn, setConn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [curChat, setCurChat] = useState(null);

  useEffect(() => {
    socket.on("connection", () => {
      socket.emit("registeruser", userId, () => {
        setConn(true);
      });
    });
    socket.on("loadhist", (data) => {
      setChatData(data);
    });
    socket.on("newchat", (receiverId) => {
      setChatData([...chatData, { receiverId, chatHist: [] }]);
    });
    socket.on("getmessage", (senderId, message) => {
      setChatData([
        ...chatData,
        {
          receiverId,
          chatHist: [...chatData?.chatHist, { message, senderId }],
        },
      ]);
    });
  }, []);

  useEffect(() => {
    socket.emit("startchat", receiverId);
  }, [conn]);

  function sendMsg({ receiverId, message }) {
    socket.emit("sendmessage", receiverId, message);
  }

  const data = [
    { name: "Afeef Uddin" },
    { name: "Subharthi Hazra" },
    { name: "Arion" },
  ];
  // const chats = [
  //   { message: "hey", yousent: true },
  //   { message: "hey", yousent: false },
  // ];
  return (
    <div className="p-4 pl-8 pr-8 h-full grid grid-cols-4 w-full gap-6">
      <div className="h-full col-span-1">
        <ChatList list={data} curChat={curChat} setCurChat={setCurChat} />
      </div>
      <div className="col-span-3">
        <Chatting
          name="Afeef Uddin"
          chats={chatData?.filter((x) => x.receiverId === curChat)}
          curChat={curChat}
        />
      </div>
    </div>
  );
}

export default Chats;
