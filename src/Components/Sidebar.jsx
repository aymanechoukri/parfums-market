import { Link } from "react-router-dom";

export default function Sidebar() {
    return(
        <div className="w-64 bg-gradient-to-b from-slate-50 to-white h-screen border-r border-slate-200 p-6 shadow-sm ">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admin</h1>
                <p className="text-sm text-slate-500 mt-1">Management Panel</p>
            </div>
            
            <nav className="space-y-1">
                <Link 
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all duration-200 font-medium group"
                    to={"/dashbord"}
                >
                    <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-500 transition-colors"></div>
                    <span>Dashboard</span>
                </Link>

                <Link 
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all duration-200 font-medium group"
                    to={"users"}
                >
                    <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-500 transition-colors"></div>
                    <span>Users</span>
                </Link>

                <Link 
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all duration-200 font-medium group"
                    to={"users/create"}
                >
                    <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-500 transition-colors"></div>
                    <span>Create user</span>
                </Link>
            </nav>
        </div>
    )
}