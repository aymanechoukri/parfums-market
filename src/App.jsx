import { Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Signup from "./pages/Signup";
import Lognup from "./pages/Lognup"
import Home from "./pages/Home";
import Dashbord from "./pages/Dashbord";
import Users from "./pages/Users";
import Update from "./pages/Update";
import CreateUser from "./pages/CreateUser";
import RequierAuther from "./RequierAuther";


export default function App() {
  return(
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/lognup" element={<Lognup />} />

       <Route element={<RequierAuther />} >
        <Route path="/dashbord" element={<Dashbord />} >
        <Route path="users" element={<Users />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="user/:id" element={<Update />} />
        </Route> 
       </Route>
    </Routes>
    </>
  )
}
