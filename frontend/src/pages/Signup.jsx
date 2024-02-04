import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginWithGoogle, SignOut, SignupWithEmail } from "@/firebase/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["XSRF-TOKEN"]);

  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const user = await SignupWithEmail(email?.trim(), password?.trim());
      const idToken = await user.getIdToken();
      const data = await axios.post(
        import.meta.env.VITE_API_LINK + "/auth/signup",
        {
          email,
          name: name,
          idToken: idToken,
        },
        {
          withCredentials: true,
          headers: {
            "CSRF-Token": cookies["XSRF-TOKEN"],
          },
        }
      );
    } catch (error) {}
  }

  async function handleSignupGoogle() {
    const { user, status, info } = await LoginWithGoogle();
    if (status == "true") {
      if (info) {
        try {
          const idToken = await user.getIdToken();
          const data = await axios.post(
            import.meta.env.VITE_API_LINK + "/auth/signup",
            {
              email: user.email,
              name: user.displayName,
              idToken: idToken,
            },
            {
              withCredentials: true,
              headers: {
                "CSRF-Token": cookies["XSRF-TOKEN"],
              },
            }
          );
          navigate("/user");
        } catch (error) {}
      } else {
        try {
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
        } catch (error) {}
      }
    }
  }

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
                  Signup
                </Button>
              </div>
              <div className="mb-2">or</div>
              <div>
                <Button variant="outline" onClick={() => handleSignupGoogle()}>
                  Signup With Google
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
