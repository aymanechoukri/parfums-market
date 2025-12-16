import { useContext } from "react";
import { Users } from "./Context/Context";
import { Outlet, Navigate } from "react-router-dom";

export default function RequireAuth() {
  const { authe } = useContext(Users);

  if (!authe?.token) {
    return <Navigate to="/lognup" replace />;
  }

  return <Outlet />;
}
