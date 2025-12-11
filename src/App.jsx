import { Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Signup from "./Signup";
import Lognup from "./Lognup"
import Home from "./Home";
import Dashbord from "./Dashbord";
import Users from "./Users";
import Update from "./Update";


export default function App() {
  return(
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/lognup" element={<Lognup />} />
       <Route path="/dashbord" element={<Dashbord />} >
        <Route path="users" element={<Users />} />
        <Route path="user/:id" element={<Update />} />
       </Route> 
    </Routes>
    </>
  )
}
