import ErrorHandler from '@/components/user/errorHandler';
import useAuthStore from '@/stores/auth';
import { host } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { mutate } from 'swr';

const ModalBarangKeluar = ({id, jmlh, transaksi_id, variant_id, harga, barang}) => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setEror] = useState(false);
    let formRef = useRef()
    const router = useRouter()
    const handleOpen = () => {
        setOpen(!open);
    };
    const handleEdit = async (e) => {
    e.preventDefault();
    let {jumlah:{value:jumlah}} = formRef.current

    try {
      setLoading(true);
      const response = await axios.patch(`${host}/barang-keluar/${id}`, { transaksi_id, variant_id, harga, jumlah }, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setLoading(false);
      toast.success("Edit Barang Keluar berhasil");
      setOpen(false);
      try {
            
            mutate(`${host}/barang-keluar`, {
                  headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
            }, barang); 
        } catch (error) {
            console.error('Failed to fetch data:', error);
            mutate(`${host}/barang-keluar`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${user.token}`,
            },}, undefined, false); 
        }
     
    } catch (error) {
      setLoading(false);
      setEror(error);
     
    }
  }
  return (
    <>
        <button onClick={handleOpen}
            className="btn btn-primary">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24">
                    <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}>
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z"></path>
                    </g>
                </svg>
        </button>
      {open && (
        <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-800 bg-opacity-50  z-50">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            
            <form onSubmit={handleEdit} ref={formRef}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-3"
                  htmlFor="jumlah"
                >
                  Jumlah
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  id="jumlah"
                  placeholder="Jumlah Produk"
                  name="jumlah"
                  defaultValue={jmlh}
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
  )
}

export default ModalBarangKeluar
