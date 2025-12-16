import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users as formation } from "../Context/Context";

export default function Users() {
  const user = useContext(formation);
  const token = user.authe.token;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const showUsers = users.map((user, index) => (
    <tr key={index} className="hover:bg-gray-100/20">
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
        <Link to={`/dashbord/user/${user.id}`}>
          <i className="fa-solid fa-pen-to-square text-slate-950 text-1xl cursor-pointer mr-3 hover:text-slate-800 active:text-slate-300"></i>
        </Link>
        <i
          onClick={() => deletUsers(user.id)}
          className="fa-solid fa-trash text-red-600 text-1xl cursor-pointer hover:text-red-400 active:text-red-200"
        ></i>
      </td>
    </tr>
  ));

  async function deletUsers(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((rev) => rev.id !== id));
    } catch (error) {
      console.error(error);
    }
  }
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
