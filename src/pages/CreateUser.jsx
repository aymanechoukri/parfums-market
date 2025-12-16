import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { Users } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Signup() {
  const nameRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [valide, setValid] = useState(null);

  const nav = useNavigate()

  const userStorge = useContext(Users);
  const token = userStorge.authe.token

  async function toggelSubmit(e) {
    e.preventDefault();
    setAccept(true);

    if (name === "" || password.length < 8 || password !== confirm) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/user/create", {
        name,
        email,
        password,
        password_confirmation: confirm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    

      if(res.status === 200) {
        nav("/dashbord/users");
      }
    } catch (error) {
      setValid(error.status);
    }
  }
  return (

      <div className="flex justify-center items-center h-135 flex-col w-full">
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
            value={name ?? ""}
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
            value={email ?? ""}
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
              Password must be at least 8 characters long.
            </p>
          )}

          <label
            htmlFor="confirm-password"
            className="text-md font-bold text-white "
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
          {password !== confirm && accept && (
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
            Create user
          </button>
        </form>
      </div>
  );
}
