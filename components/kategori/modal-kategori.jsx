import Axios from "@/api";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "../../components/user/errorHandler";

const ModalKategori = ({ id, user_id, nama, fetchData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState(false);
  const [data, setData] = useState({
    user_id: user_id,
    nama: nama,
  });

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios.put(`/kategori/${id}`, data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setLoading(false);
      toast.success("Edit Kategori berhasil");
      setOpen(false);
      router.reload()
     
    } catch (error) {
      setLoading(false);
      setEror(error);
    }
  };

  const handleInput = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios.post(`/kategori`, data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLoading(false);
      toast.success("Input Kategori berhasil");
      setOpen(false);
      setData({ nama: "" });
      fetchData();
    } catch (error) {
      setLoading(false);
      setEror(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <button onClick={handleOpen}>
        {data.nama != "" && id ? (
          <img
            src="/assets/user/images/edit.png"
            alt="edit"
            className="dark:invert bg-white p-1 hover:scale-[1.8]"
            width={25}
            height={25}
            loading="lazy"
          />
        ) : (
          <img
            src="/assets/user/images/app.png"
            alt="insert"
            className="dark:invert hover:scale-[1.5] bg-white p-1 rounded-xl absolute text-left "
            width={50}
            height={50}
            loading="lazy"
          />
        )}
      </button>
      {open && (
        <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-800 bg-opacity-50  z-50">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <button
              className="absolute top-0 right-0 m-2 bg-transparent text-gray-600 text-lg hover:text-gray-800"
              onClick={handleOpen}
            >
              ✕
            </button>
            <form onSubmit={data.nama != "" && id ? handleEdit : handleInput}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nama"
                >
                  Nama
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nama"
                  type="text"
                  placeholder="Nama"
                  name="nama"
                  value={data.nama}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading...." : "Submit"}
                </button>
                <button
                  onClick={handleOpen}
                  className="w-full mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  disabled={loading}
                >
                  Tutup
                </button>
                {error && <ErrorHandler error={error} />}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalKategori;
