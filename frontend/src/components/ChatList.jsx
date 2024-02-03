import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { get_initals } from "@/lib/utils";

function ChatList({ list }) {
  return (
    <div className="flex flex-col bg-neutral-400 min-h-full rounded p-4">
      {list?.map((e, i) => (
        <div key={i}>
          <div className="flex flex-row pl-2 pr-2 pb-1 pt-1 gap-2">
            <div>
              <Avatar>
                <AvatarFallback>{get_initals(e.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div>{e.name}</div>
          </div>
          <Separator className="my-4" />
        </div>
      ))}
    </div>
  );
}

export default ChatList;
