import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Navbar from "@/components/Navbar";

function Chatbot() {
  const [chatData, setChatData] = useState([]);
  return (
    <div className="px-4">
      <Navbar />
      <div className=" min-h-full">
        <div className=" mx-4">
          {chatData?.map((item, i) => (
            <MessageBlob
              message={message}
              isLoading={isLoading}
              own={own}
              key={i}
            />
          ))}
        </div>
        <div className="flex gap-2 absolute bottom-[8px] w-[calc(100%-16px*2)]">
          <Input type="text" className="" />
          <Button>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageBlob({ message, isLoading, own }) {
  return (
    <div
      className={`flex flex-column ${own ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex flex-column text-white ${
          own ? "bg-green-400" : "bg-slate-600"
        }`}
      >
        <div className="rounded-lg p-1">{message}</div>
        {isLoading && <div className="w-[20px] h-[20px]"></div>}
      </div>
    </div>
  );
}

export default Chatbot;
