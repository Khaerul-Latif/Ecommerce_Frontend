import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "../../api/index.jsx";
import useAuthStore from "@/stores/auth.js";
import useLocalStorageStore from "./userStore.jsx";
import Link from "next/link.js";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "./errorHandler.jsx";

const MyAddressComp = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { user } = useAuthStore();
  const { getAllItems } = useLocalStorageStore();
  const [user_id, setUser_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState(false);

  useEffect(() => {
    const storedItems = getAllItems();
    if (storedItems.length > 0) {
      setUser_id(storedItems[0].id);
    }
  }, []);

  useEffect(() => {
    if (user_id !== "") {
      fetchData();
    }
  }, [user_id]);

  const fetchData = async () => {
    try {
      const response = await Axios.get(`/alamat/${user_id}/user`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = response.data.data;
      setData(result);
    } catch (error) {
      setEror(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Apakah yakin akan menghapus alamat ini?"
      );
      if (confirmDelete) {
        const response = await Axios.delete(`/alamat/${id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success("Alamat berhasil di hapus");
        fetchData();
      }
    } catch (error) {
      setEror(error);
    }
  };

  return (
    <div className="flex flex-col font-[inter] lg:w-[700px] sm:w-[500px] w-auto">
      <Toaster position="top-center" />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
          <div className="m-3  flex justify-between mb-10">
            <div className="font-bold text-2xl capitalize text-black">
              My Address
            </div>
            <Link href={"/user/insert-address"} passHref>
              <button className="hover:bg-orange-500 hover:text-white hover:p-3 hover:rounded-md">
                Insert
              </button>
            </Link>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th className="px-auto py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Daftar Alamat
                  </th>
                  <th className="px-auto py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alamat
                  </th>
                  <th className="px-auto py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-auto py-4 whitespace-nowrap">
                        Alamat_ {index + 1}
                      </td>
                      <td className="px-auto py-4 whitespace-nowrap">
                        {item.alamat_lengkap}
                      </td>
                      <td className="px-auto py-4 whitespace-nowrap text-right text-sm font-medium  flex justify-center">
                        <Link href={`/user/address/${item.id}`} passHref>
                          <button>
                            <img
                              src="/assets/user/images/edit.png"
                              alt="edit"
                              className="dark:invert"
                              width={25}
                              height={25}
                              loading="lazy"
                            />
                          </button>
                        </Link>

                        <button onClick={() => handleDelete(item.id)}>
                          <img
                            src="/assets/user/images/bin.png"
                            alt="Delete"
                            className="dark:invert"
                            width={25}
                            height={25}
                            loading="lazy"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Alamat tidak ada...</td>
                  </tr>
                )}
              </tbody>
            </table>
            {error && <ErrorHandler error={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddressComp;
