import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
  const cookie = new Cookies();
  const tokenCookie = cookie.get("Bearer");

  async function deleteToken() {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
        },
      });
      
      cookie.remove("Bearer");
      window.location.pathname = "/";
      
    } catch (error) {
      console.error("Logout error:", error);
      cookie.remove("Bearer");
      window.location.pathname = "/";
    }
  }

  return (
    <header>
      <nav className="flex justify-between items-center bg-slate-950 text-gray-300 px-10 shadow-[0_5px_10px_rgba(0,0,0,0.5)] h-16">
        <h1 className="text-3xl font-extrabold ">Parfums</h1>
        <ul className="flex justify-between items-center gap-10 font-extrabold">
          <li
            className="relative cursor-pointer text-white 
               after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-blue-500
               after:transition-all after:duration-300
               hover:after:w-full"
          >
            <Link to={"/"}>Home</Link>
          </li>
          <li
            className="relative cursor-pointer text-white 
               after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-blue-500
               after:transition-all after:duration-300
               hover:after:w-full"
          >
            Parfums
          </li>
          <li
            className="relative cursor-pointer text-white 
               after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-blue-500
               after:transition-all after:duration-300
               hover:after:w-full"
          >
            About
          </li>
        </ul>

        {!tokenCookie ? (
          <div className="flex justify-center items-center gap-4">
            <Link
              to="/signup"
              className="bg-blue-500 px-3 py-1 rounded-2xl hover:bg-blue-400 active:bg-blue-100 text-lg font-extrabold text-gray-300 cursor-pointer"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="text-lg font-extrabold hover:text-blue-400 active:text-blue-100 cursor-pointer"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4">

            <Link
              to="/dashboard"
              className="bg-blue-500 px-3 py-1 rounded-2xl hover:bg-blue-400 active:bg-blue-100 text-lg font-extrabold text-gray-300 cursor-pointer"
            >
              Dashboard
            </Link>

            <span
              onClick={deleteToken}
              className="text-lg font-extrabold hover:text-blue-400 active:text-blue-100 cursor-pointer"
            >
              Log out
            </span>
          </div>
        )}
      </nav>
    </header>
  );
}