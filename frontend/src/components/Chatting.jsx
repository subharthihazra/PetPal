import { Input } from "@/components/ui/input";
import { get_initals } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";

function Chatting({ chats, name }) {
  return (
    <div>
      <div className="rounded bg-neutral-400">
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarFallback>{get_initals(name)}</AvatarFallback>
          </Avatar>
          {name}
        </div>
        <Separator />
        <div>
          {chats?.map((e, i) => {
            if (e.yousent == true) {
              return (
                <div className="flex flex-row-reverse" key={i}>
                  {e.message}
                </div>
              );
            } else {
              return (
                <div className="flex flex-row" key={i}>
                  {e.message}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div>
        <Input type="text" placeholder="Write Message" />
      </div>
    </div>
  );
}

export default Chatting;
