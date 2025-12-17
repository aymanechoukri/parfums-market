
import { Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Update from "./pages/Update";
import CreateUser from "./pages/CreateUser";
import RequireAuth from "./RequireAuth";
import SaveUsers from "./SaveUsers";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<SaveUsers />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="users/create" element={<CreateUser />} />
              <Route path="user/:id" element={<Update />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
