import Axios from "@/api";
import useAuthStore from "@/stores/auth";
import React, { useEffect, useState } from "react";
import ModalKategori from "./modal-kategori";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "../../components/user/errorHandler";

const TabelKategori = () => {
  const { user } = useAuthStore();
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await Axios.get(`/kategori`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = response.data.data;
      setData(result);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Apakah yakin akan menghapus data ini?"
      );
      if (confirmDelete) {
        const response = await Axios.delete(`/kategori/${id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        toast.success("Hapus Kategori berhasil");
        fetchData();
      }
    } catch (error) {
      setError(error);
    }
  };
  


  return (
    <div className="mx-[200px]">
      <Toaster position="top-center" />

      {/* title */}
      <div className="flex flex-col w-full box-sizing-border mb-5 mt-[120px]">
        <ModalKategori fetchData={fetchData} />
        <div className="inline-block break-words font-['Montserrat'] font-bold text-[36px] leading-[1.5] text-[#666666] text-center">
          Daftar Kategori
        </div>
        <div className="mt-3 mb-10 rounded-[8px] bg-[#438DB8] w-[60px] h-[5px]"></div>
      </div>

      <div className="overflow-x-auto shadow-md h-[300px] overflow-scroll w-full bg-white">
        <table className="w-full border-collapse rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Nama Kategori</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">
                    <ModalKategori id={item.id} nama={item.nama} />
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="ml-2 transform transition-transform hover:rotate-y-180"
                    >
                      <img
                        src="/assets/user/images/bin.png"
                        alt="Delete"
                        className="dark:invert bg-white p-1 hover:scale-[1.8]"
                        width={30}
                        height={30}
                        loading="lazy"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 border-b text-center">
                  Data tidak ada...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {error && <ErrorHandler error={error} />}
    </div>
  );
};

export default TabelKategori;
