import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Users as formation } from "../Context/Context";

export default function Users() {
  const context = useContext(formation);
  const token = context?.authe?.token;
  const [users, setUsers] = useState([]);
  
  const deletUsers = useCallback(async (id) => {
    if (!token) {
      console.error("No token available");
      return;
    }
    
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      console.error("No token available for fetching users");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [token]);

  const showUsers = users.map((user, index) => (
    <tr key={user.id || index} className="hover:bg-gray-100/20">
      <td className="px-6 py-4 border-t border-gray-100/30 text-gray-300">
        {index + 1}
      </td>
      <td className="px-6 py-4 border-t border-gray-100/30 font-medium text-gray-300">
        {user.name}
      </td>
      <td className="px-6 py-4 border-t border-gray-100/30 text-gray-300">
        {user.email}
      </td>
      <td className="px-6 py-4 border-t border-gray-100/30 text-gray-300">
        <Link to={`/dashboard/user/${user.id}`}>
          <i className="fa-solid fa-pen-to-square text-slate-950 text-1xl cursor-pointer mr-3 hover:text-slate-800 active:text-slate-300"></i>
        </Link>
        <i
          onClick={() => deletUsers(user.id)}
          className="fa-solid fa-trash text-red-600 text-1xl cursor-pointer hover:text-red-400 active:text-red-200"
        ></i>
      </td>
    </tr>
  ));

  return (
    <div className="w-full overflow-x-auto p-6">
      <table className="w-full border border-gray-100/50 rounded-lg overflow-hidden table-auto">
        <thead>
          <tr className="bg-gray-50/30">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-800/90">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-800/90">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-800/90">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-800/90">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}