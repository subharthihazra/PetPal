import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginWithEmail, SignOut, LoginWithGoogle } from "@/firebase/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["XSRF-TOKEN"]);

  async function handleLogin() {
    const user = await LoginWithEmail(email?.trim(), password?.trim());
    const idToken = await user.getIdToken();
    await axios.post(
      import.meta.env.VITE_API_LINK + "/auth/login",
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

  async function handleLoginGoogle() {
    const { user, info, status } = await LoginWithGoogle();
    console.log(user, info, status);
    const idToken = await user.getIdToken();
    await axios.post(
      import.meta.env.VITE_API_LINK + "/auth/login",
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

  return (
    <>
      <div className="h-screen flex justify-center bg-gray-400">
        <div className=" mt-auto mb-auto border border-black pt-6 pb-6 pl-3 pr-3 rounded w-80 bg-white">
          <div className="flex flex-col items-center gap-4">
            <div>
              <div className="text-center">Logo</div>
              <div>Welcome Back</div>
            </div>
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
                <Button className="w-full" onClick={() => handleLogin()}>
                  Login
                </Button>
              </div>
              <div className="mb-2">or</div>
              <div>
                <Button variant="secondary" onClick={() => handleLoginGoogle()}>
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

export default Login;