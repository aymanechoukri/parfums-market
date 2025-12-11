import React, { useRef, useEffect, useState } from "react";
import Header from "./Components/Header";
import axios from "axios";

export default function Signup() {
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [valide, setValid] = useState(null);

  async function toggelSubmit(e) {
    e.preventDefault();
    setAccept(!accept);

    if (name === "" || password.length < 8 || password !== confirm) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: confirm,
      });
      if (res.status === 200) {
        window.location.pathname = "/";
        window.localStorage.setItem("email", email);
      }
    } catch (error) {
      setValid(error.status);
    }
  }
  useEffect(() => {
    nameRef.current.focus();
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
          <label
            htmlFor="full-name"
            className="text-md font-bold text-white mb-"
          >
            Full name:
          </label>
          <input
            ref={nameRef}
            className="bg-gray-400/20 rounded-2xl py-2 px-5 border border-transparent
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-xl text-gray-300"
            type="text"
            id="full-name"
            name="full-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name === "" && accept && (
            <p className="text-red-600 text-sm">Please enter your name</p>
          )}

          <label htmlFor="email" className="text-md font-bold text-white mb-">
            Email:
          </label>
          <input
            className="bg-gray-400/20 rounded-2xl py-2 px-5 border border-transparent
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-xl text-gray-300"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {valide === 422 && accept && (
            <p className="text-red-600 text-sm">This account exists</p>
          )}

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

          <label
            htmlFor="confirm-password"
            className="text-md font-bold text-white mb-"
          >
            Confirm password:
          </label>
          <input
            className="bg-gray-400/20 rounded-2xl py-2 px-5 border border-transparent
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-xl text-gray-300"
            type="password"
            id="confirm-password"
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {password !== confirm && (
            <p className="text-red-600 text-sm">Not matching</p>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
