import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chats from "@/components/Chats";
import PetCard from "@/components/PetCard";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Account from "@/components/Account";
import { useSearchParams } from "react-router-dom";

async function getPets() {
  let data = await axios.get(process.env.VITE_API_URL + "/dashboards/uploads");
  data = await data.data;
  return data;
}
function User() {
  const [searchParams, setSearchParams] = useSearchParams();
  const curtab = searchParams.get("tab");

  // const data=[{name:"YOLO",description:"HHHHHH",gender: "Male",health:"bad",location:"ohio",image :".123.jpg"}]
  const { isPending, data, isError, isLoading } = useQuery({
    queryKey: ["Pets"],
    queryFn: async () => getPets(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className=" pt-4 pb-4">
      <Navbar />
      <div>Hey John Doe</div>
      <Tabs
        defaultValue={curtab || "account"}
        className=" h-full"
        onValueChange={(v) => setSearchParams({ tab: v })}
      >
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Account pets={data} />
        </TabsContent>
        <TabsContent value="chats" className="h-full">
          <Chats />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default User;
