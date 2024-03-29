import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Navbar from "@/components/Navbar";
import Markdown from "react-markdown";

function Chat({ text, own, isLoading = false }) {
  return (
    <div
      className={`${""} ${own && "pt-[20px] pb-[10px]"} ${
        !own && "border-b-[1px] pt-[10px] pb-[20px]"
      }`}
    >
      <div
        className={`${""} ${own && "p-[10px] bg-slate-200 rounded-lg w-fit"}`}
      >
        <Markdown>{text}</Markdown>
      </div>
      {isLoading && (
        <div className="bg-[#00000099] w-[16px] h-[16px] rounded-full"></div>
      )}
    </div>
  );
}

function LoaderRipple() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-130px)]">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-orange-900 rounded-full" />
        <div className="w-8 h-8 bg-orange-900 rounded-full absolute top-0 left-0 animate-ping" />
        <div className="w-8 h-8 bg-orange-900 rounded-full absolute top-0 left-0 animate-pulse" />
      </div>
    </div>
  );
}

function Chatbot() {
  const [chat, setChat] = useState([]);
  const [chatState, setChatState] = useState("busy");
  const [chatInit, setChatInit] = useState(false);
  const [message, setMessage] = useState("");
  const mainRef = useRef();

  let ws = useRef(null);

  useEffect(() => {
    // if (mainRef.current) {
    //   //   const container = mainRef.current;
    //   //   container.scrollTop = container.scrollHeight;
    // }
    window.scrollTo(0, document.body.scrollHeight);
  }, [chat]);

  useEffect(() => {
    // if (chatId !== null) {
    //make a websocket connection here
    let wss = new WebSocket(String(import.meta.env.VITE_CHATBOT_WSS));
    wss.addEventListener("open", () => {
      console.log("Websocket connected");
      ws.current.send(JSON.stringify({ type: "client:connected" }));
      //   ws.current.send(JSON.stringify({ type: "client:chathist" }));

      setChatState("idle");
      setChatInit(true);
    });
    wss.addEventListener("message", (event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);

      if (data?.type === "server:response:start") {
        // setChat((prevchat) => [
        //   ...prevchat,
        //   { message: "", own: false, isLoading: true },
        // ]);
      } else if (data?.type === "server:response:chunk") {
        setChat((prevchat) => {
          // prevchat.at(-1).message += data.chunk;
          // console.log("!!!", prevchat);
          // console.log("!!!", prevchat.slice(-1));
          return [
            ...prevchat.slice(0, -1),
            {
              message: `${prevchat.at(prevchat.length - 1).message}${
                data.chunk
              }`,
              own: false,
              isLoading: true,
            },
          ];
        });
        // console.log("@text", data.chunk);
      } else if (data?.type === "server:response:end") {
        // response = "";
        // promptBut.disabled = false;
        setChat((prevchat) => {
          return [
            ...prevchat.slice(0, -1),
            {
              message: prevchat.at(prevchat.length - 1).message,
              own: false,
              isLoading: false,
            },
          ];
        });
        setChatState("idle");
      }
    });
    ws.current = wss;
    // }
  }, []);

  const handleClick = () => {
    setChat((prevchat) => [...prevchat, { message, own: true }]);
    console.log("prompt", message);
    ws.current?.send(
      JSON.stringify({
        type: "client:prompt",
        prompt: message,
      })
    );
    setMessage("");
    setChatState("busy");
    setChat((prevchat) => [
      ...prevchat,
      { message: "", own: false, isLoading: true },
    ]);
  };
  return (
    <div className="px-4">
      <Navbar />
      <div className="pb-[60px] min-h-full" ref={mainRef}>
        <div className=" mx-4">
          {!chatInit && (
            <div>
              <LoaderRipple />
            </div>
          )}
          {chatInit && chat.length === 0 && (
            <div className="flex justify-center items-center min-h-[calc(100vh-130px)]">
              <div>
                Having questions about Animals or Pets?
                <br />
                Chat with me now.
              </div>
            </div>
          )}
          {chatInit &&
            chat &&
            chat?.map((item, i) => (
              <Chat
                text={item.message}
                isLoading={item.isLoading}
                own={item.own}
                key={i}
              />
            ))}
        </div>
        <div className="fixed bottom-0 py-[8px] w-[calc(100%-16px*2)] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex gap-2"
          >
            <Input
              type="text"
              className=""
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              onClick={() => {
                handleClick();
              }}
              disabled={chatState === "busy" ? true : false}
            >
              <ArrowRightIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
