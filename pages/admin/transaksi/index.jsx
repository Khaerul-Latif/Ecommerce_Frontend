import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/auth";
import DialogFormTransaksi from "@/components/shared/DialogFormTransaksi";
import toast, { Toaster } from "react-hot-toast";
import { host } from "@/utils/constant";

export default function Index() {
  const [transaksi, setTransaksi] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuthStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/transaksi`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTransaksi(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [user]);

  const [isDialogPembayaranOpen, setIsDialogPembayaranOpen] = useState(false);
  const [isDialogPengirimanOpen, setIsDialogPengirimanOpen] = useState(false);
  const [input, setInput] = useState([]);

  const handleOpenPembayaranDialog = (data) => {
    setInput(data);
    setIsDialogPembayaranOpen(true);
  };

  const handleOpenPengirimanDialog = (data) => {
    setInput(data);
    setIsDialogPengirimanOpen(true);
  };

  const handleClosePembayaranDialog = () => {
    setIsDialogPembayaranOpen(false);
  };

  const handleClosePengirimanDialog = () => {
    setIsDialogPengirimanOpen(false);
  };

  const handleSubmitPembayaranForm = async (input, data) => {
    try {
      let store = {
        user_id: data.user_id,
        status_pengiriman: data.status_pengiriman,
        total_harga: data.total_harga,
        tanggal: data.tanggal,
        kode_promo: data.kode_promo,
        status_pembayaran: input,
        bukti_pembayaran: data.bukti_pembayaran,
        alamat_id: data.alamat_id,
      };
      const response = await axios.put(`${host}/transaksi/${data.id}`, store, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Data Success Update");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Bukti Pembayaran Belum Di Upload Pembeli");
      } else {
        toast.error("Error");
      }
    }
  };

  const handleSubmitPengirimanForm = async (input, data) => {
    try {
      let store = {
        user_id: data.user_id,
        status_pengiriman: input,
        total_harga: data.total_harga,
        tanggal: data.tanggal,
        kode_promo: data.kode_promo,
        status_pembayaran: data.status_pembayaran,
        bukti_pembayaran: data.bukti_pembayaran,
        alamat_id: data.alamat_id,
      };
      await axios.put(`${host}/transaksi/${data.id}`, store, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Data Success Update");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete this Transaction?")) {
        await axios.delete(`${host}/transaksi/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("Data Success Deleted");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleImage = (link) => {
    router.push(`${link}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <DialogFormTransaksi
        isOpen={isDialogPembayaranOpen}
        onClose={handleClosePembayaranDialog}
        onSubmit={handleSubmitPembayaranForm}
        isSelect={true}
        data={input}
      />
      <DialogFormTransaksi
        isOpen={isDialogPengirimanOpen}
        onClose={handleClosePengirimanDialog}
        onSubmit={handleSubmitPengirimanForm}
        isSelect={false}
        data={input}
      />
      <h1 className="text-3xl font-bold mt-10 mb-5">List of Transaksi</h1>
      <table className="table-auto border-collapse border border-gray-800">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2">No</th>
            <th className="border border-gray-800 p-2">Nama</th>
            <th className="border border-gray-800 p-2">Alamat</th>
            <th className="border border-gray-800 p-2">Harga Total</th>
            <th className="border border-gray-800 p-2">Kode Promo</th>
            <th className="border border-gray-800 p-2">Tanggal Order</th>
            <th className="border border-gray-800 p-2">Status Pembayaran</th>
            <th className="border border-gray-800 p-2">Status Pengiriman</th>
            <th className="border border-gray-800 p-2">Bukti Pembayaran</th>
            <th className="border border-gray-800 p-2">Action Change</th>
          </tr>
        </thead>
        <tbody>
          {transaksi.map((data, index) => (
            <tr key={data.id}>
              <td className="border border-gray-800 p-2">{index + 1}</td>
              <td className="border border-gray-800 p-2">{data.user.name}</td>
              <td className="border border-gray-800 p-2">
                {data.alamat.alamat_lengkap}
              </td>
              <td className="border border-gray-800 p-2">
                Rp. {data.total_harga.toLocaleString()}
              </td>
              <td className="border border-gray-800 p-2">
                {data.kode_promo !== null ? data.kode_promo : "-"}
              </td>
              <td className="border border-gray-800 p-2">{data.tanggal}</td>
              <td className="border border-gray-800 p-2">
                {data.status_pembayaran ? "Lunas" : "Belum Bayar"}
              </td>
              <td className="border border-gray-800 p-2">
                {data.status_pengiriman.toUpperCase()}
              </td>
              <td className="border border-gray-800 p-2 ">
                {data.bukti_pembayaran !== "" ? (
                  <button
                    onClick={() => handleImage(data.bukti_pembayaran)}
                    className="w-full px-4 py-2 mr-2 bg-blue-300 text-black rounded-md font-semibold hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Show Image
                  </button>
                ) : (
                  "Belum Upload"
                )}
              </td>
              <td className="border border-gray-800 p-2">
                <button
                  onClick={() => handleOpenPembayaranDialog(data)}
                  className="px-4 py-2 mr-2 bg-green-200 text-black rounded-md font-semibold hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Pembayaran
                </button>
                <button
                  onClick={() => handleOpenPengirimanDialog(data)}
                  className="px-4 py-2 mr-2 bg-yellow-300 text-black rounded-md font-semibold hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Pengiriman
                </button>
                <button
                  onClick={() => handleDelete(data.id)}
                  className="px-4 py-2 bg-red-400 text-black rounded-md font-semibold hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
