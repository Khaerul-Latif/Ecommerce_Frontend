import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/auth";
import toast, { Toaster } from "react-hot-toast";
import { host } from "@/utils/constant";

export default function Index() {
  const [promos, setPromos] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${host}/promo`
        );
        setPromos(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus promo ini?"
      );
      if (confirmed) {
        await axios.delete(`${host}/promo/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success("Promo berhasil di hapus");
        setPromos(promos.filter((promo) => promo.id !== id));
        window.location.reload();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreate = () => {
    router.push(`/admin/promo/create`);
  };

  const handleUpdate = (id) => {
    router.push(`/admin/promo/update/${id}`);
  };

  return (
    <div class="px-4 sm:px-6 lg:px-8 pt-20 mt-20 mb-5">
      <Toaster position="top-center" />
      <div class="sm:flex sm:items-center">
        <div class="mt-4 sm:ml-0 mr-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleCreate}
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Promo
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6">List Promo</h1>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Kode
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Diskon
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  {promos.map((promo, index) => (
                    <tr key={promo.id}>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {index + 1}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {promo.id}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {promo.kode}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {promo.diskon}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {promo.start_date}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {promo.end_date}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
          </div>
        </div>
      </div>
    </div>
  );
}
