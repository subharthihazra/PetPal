import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignOut, SignupWithEmail } from "@/firebase/firebase";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["XSRF-TOKEN"]);

  //   console.log(cookies);
  async function handleSignup() {
    const user = await SignupWithEmail(email?.trim(), password?.trim());
    const idToken = await user.getIdToken();
    await axios.post(
      import.meta.env.VITE_API_LINK + "/auth/signup",
      { idToken },
      {
        withCredentials: true,
        headers: {
          "CSRF-Token": cookies["XSRF-TOKEN"],
        },
      }
    );
    await SignOut();
    navigate("/user");
  }
  async function handleSignupGoogle() {}
  return (
    <>
      <div className="h-screen flex justify-center bg-gray-400">
        <div className=" mt-auto mb-auto border border-black pt-6 pb-6 pl-3 pr-3 rounded w-80 bg-white">
          <div className="flex flex-col items-center gap-4">
            <div>
              <div className="text-center">Logo</div>
              <div>Welcome</div>
            </div>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=""
            ></Input>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=""
            ></Input>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <Button className="w-full" onClick={() => handleSignup()}>
                  Login
                </Button>
              </div>
              <div className="mb-2">or</div>
              <div>
                <Button variant="outline" onClick={() => handleSignupGoogle()}>
                  Login With Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;