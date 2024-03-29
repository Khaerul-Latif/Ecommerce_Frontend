import Axios from "@/api";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "./errorHandler";
import { cloudName, uploadPreset } from "@/utils/constant";

const ModalUploadBayar = ({
  id,
  user_id,
  alamat_id,
  total_harga,
  tanggal,
  kode_promo,
  status_pengiriman,
  fetchList,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState(false);
  const [imagepreview, setImagePreview] = useState(null);
  const [bukti_pembayaran, setBuktiPembayaran] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBuktiPembayaran(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.error("Pembayaran berhasil ditambahkan");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Upload gambar ke Cloudinary
      const image = new FormData();
      image.append("file", bukti_pembayaran);
      image.append("cloud_name", cloudName);
      image.append("upload_preset", uploadPreset);

      const cloudinaryResponse = await Axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        image
      );

      // Jika upload gambar berhasil, dapatkan URL gambar dari Cloudinary
      const imageURL = cloudinaryResponse.data.secure_url;

      const data = {
        bukti_pembayaran: imageURL,
        user_id: user_id,
        alamat_id: alamat_id,
        total_harga: total_harga,
        tanggal: tanggal,
        kode_promo: kode_promo,
        status_pembayaran: 0,
        status_pengiriman: status_pengiriman,
      };

      const response = await Axios.patch(`/transaksi/${id}`, data, {
        headers: {
          accept: "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLoading(false);
      toast.success("Pembayaran berhasil ditambahkan");
      setOpen(false);
      fetchList();
    } catch (error) {
      setLoading(false);
      setEror(error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className=" w-full border border-orange-500 text-orange-500 hover:bg-orange-400 hover:text-white px-3 py-2 rounded"
      >
        Bayar
      </button>
      <div
        class={`fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-800 bg-opacity-50  z-50  ${
          open ? "" : "hidden"
        }`}
      >
        <div class="mx-auto ">
          <form
            class=" bg-white shadow-md rounded  px-8 pt-6 pb-8 "
            onSubmit={handleSubmit}
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 text-center"
                for="bukti_pembayaran"
              >
                Upload bukti bayar
              </label>

              {/* immage preview */}
              <img src={imagepreview} alt="" className="w-[200px] h-auto" />
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bukti_pembayaran"
                type="file"
                placeholder="bukti_pembayaran"
                name="bukti_pembayaran"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? "Loading...." : "Save"}
              </button>
              <button
                onClick={handleOpen}
                class=" w-1/2 mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                disabled={loading}
              >
                tutup
              </button>
              {error && <ErrorHandler error={error} />}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalUploadBayar;
