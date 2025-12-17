import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Users as formation } from "./Context/Context";

import Loading from "./Components/Loading";
import Cookies from "universal-cookie";

export default function SaveUsers() {
  const user = useContext(formation);
  const token = user.authe.token;

  const [loading, setLoading] = useState(true);

  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((data) => {
            console.log(data)
            cookie.set("Bearer", data.data.token);
            user.setAuthe(() => {
              return { userStorge: data.data.user, token: data.data.token };
            });
          });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
