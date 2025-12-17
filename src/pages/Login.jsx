import React, { useRef, useEffect, useState, useContext } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { Users } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login() {
  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);

  const nav = useNavigate();

  const userStorge = useContext(Users);

  const cookie = new Cookies();

  async function toggelSubmit(e) {
    e.preventDefault();
    setAccept(!accept);

    if (password.length < 8) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      const token = res.data.data.token;
      const userAccept = res.data.data.user;
      userStorge.setAuthe({ token, userAccept });
      cookie.set("Bearer", token);

      if (res.status === 200) {
        nav("/dashboard");
      }
    } catch (error) {
      if (error.status === 401) {
        alert("This account does not exist");
      }
    }
  }
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-135 flex-col">
        <form
          action=""
          className="flex flex-col gap-2 bg-slate-950 text-gray-400/60 py-5 px-12 w-1/2 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          onSubmit={toggelSubmit}
        >
          <label htmlFor="email" className="text-md font-bold text-white mb-">
            Email:
          </label>
          <input
            ref={emailRef}
            className="bg-gray-400/20 rounded-2xl py-2 px-5 border border-transparent
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-xl text-gray-300"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label
            htmlFor="password"
            className="text-md font-bold text-white mb-"
          >
            Password:
          </label>
          <input
            className="bg-gray-400/20 rounded-2xl py-2 px-5 border border-transparent
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-xl text-gray-300"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length < 8 && accept && (
            <p className="text-red-600 text-sm">
              You must enter the word "strong" consisting of 8 letters.
            </p>
          )}

          <button
            type="submit"
            className="
            bg-sky-500 text-white font-bold  px-6 rounded-xl
            mt-5 py-3
            shadow-md
            transition-all duration-200
            
            hover:bg-sky-600
            active:bg-sky-700 active:scale-95
            cursor-pointer
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
