import { useState, useEffect } from "react";
import axios from "axios";
import { host } from "@/utils/constant";

export default function Index() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${host}/users`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${host}/promo/${id}`
      );
      setPromos(promos.filter((promo) => promo.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">List of Users</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto border-collapse border border-gray-800">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2">ID</th>
            <th className="border border-gray-800 p-2">Name</th>
            <th className="border border-gray-800 p-2">Email</th>
            <th className="border border-gray-800 p-2">Role</th>
            <th className="border border-gray-800 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-800 p-2">{user.id}</td>
              <td className="border border-gray-800 p-2">{user.name}</td>
              <td className="border border-gray-800 p-2">{user.email}</td>
              <td className="border border-gray-800 p-2">{user.role}</td>

              <td className="border border-gray-800 p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleUpdate(promo.id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(promo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
