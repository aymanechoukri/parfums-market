import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div>
      <nav className="flex justify-between items-center bg-slate-950 text-gray-300 px-10 shadow-[0_5px_10px_rgba(0,0,0,0.5)] h-16">
        <h1 className="text-3xl font-extrabold ">Parfums</h1>
          <Link to={"/"}
            className="bg-blue-500 px-3 py-1 rounded-2xl hover:bg-blue-400 active:bg-blue-100 text-lg font-extrabold text-gray-300 cursor-pointer"
          >
            Go Home
          </Link>
      </nav>
    </div>
  );
}
