import { useState, useEffect } from "react";
import useAuthStore from "@/stores/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { host } from "@/utils/constant";

export default function Index() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user, logout } = useAuthStore();

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
  }, [user]);

  const handleChangeRole = async (id, newRole) => {
    try {
      const response = await axios.put(
        `${host}/users/${id}/change-role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const updatedUser = response.data;
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, role: updatedUser.role } : user
        )
      );
      window.location.reload();
      toast.success("Berhasil menganti role");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus user ini?"
      );

      if (confirmed) {
        await axios.delete(
          `${host}/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setUsers(users.filter((user) => user.id !== id));

        window.location.reload();
        toast.success("User Berhasil Dihapus");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 m-0 pt-20 mt-5 mb-5">
      <Toaster position="top-center" />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Tabel Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">List of Users</p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th className="border border-gray-800 p-2">No</th>
                  <th className="border border-gray-800 p-2">ID</th>
                  <th className="border border-gray-800 p-2">Name</th>
                  <th className="border border-gray-800 p-2">Email</th>
                  <th className="border border-gray-800 p-2">Role</th>
                  <th className="border border-gray-800 p-2">Change Role</th>
                  <th className="border border-gray-800 p-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user, index) => (
                  <tr key={user.id} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                      <select
                        className="border border-gray-800 text-white rounded p-1"
                        value={user.role}
                        onChange={(e) =>
                          handleChangeRole(user.id, e.target.value)
                        }
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}