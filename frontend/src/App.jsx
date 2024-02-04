import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdoptSearch from "./pages/AdoptSearch";
import Upload from "./pages/Upload";
import PrivateRouter from "./Hooks/PrivateRouter";
import Chatbot from "./pages/Chatbot";
import User from "./pages/User";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "./store/auth";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      await axios.get(import.meta.env.VITE_API_LINK + "/auth/token", {
        withCredentials: true,
      });

      console.log("token ..");
    };
    getToken();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_LINK + "/auth/getUser",
        {
          withCredentials: true,
        }
      );
      dispatch(
        signIn({
          name: data.data.fullname,
          email: data.data.email,
          userId: data.data._id,
        })
      );
    };
    getUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adopt" element={<AdoptSearch />} />
        <Route
          path="/rehome"
          element={
            <PrivateRouter>
              <Upload />
            </PrivateRouter>
          }
        />

        <Route path="/user" element={<User />} />
        <Route path="/rehome" element={<Upload />} />
        <Route path="/aichat" element={<Chatbot />} />
      </Routes>
    </>
  );
}

export default App;
