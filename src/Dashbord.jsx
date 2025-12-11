import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/TopBar";

export default function Dashbord() {
    return(
        <div>
            <Topbar />
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full flex justify-center mt-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}