import React, { useEffect, useState } from "react";
import Axios from "@/api";
import useAuthStore from "@/stores/auth";
import ModalUploadBayar from "./modal-upload-pembayaran";
import useLocalStorageStore from "./userStore";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "./errorHandler";
import Link from "next/link";

const OrderListComp = () => {
  const [data, setData] = useState([]);
  const { user } = useAuthStore();
  const { getAllItems } = useLocalStorageStore();
  const [user_id, setUser_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedItems = getAllItems();
    if (storedItems.length > 0) {
      setUser_id(storedItems[0].id);
    }
  }, []);

  useEffect(() => {
    if (user_id !== "") {
      fetchList();
    }
  }, [user_id]);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(`/transaksi/user/personal`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [user]);

  return (
    <div className="flex flex-col font-[inter]">
      <Toaster position="top-center" />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="m-3 font-bold text-2xl capitalize text-black mb-10">
            Order List
          </div>
          <div className="sm:rounded-lg grid grid-cols-2 sm:grid-cols-4">
            <table className="s shadow border-gray-200 w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>

                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status Pembayaran
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status Pengiriman
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total harga
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {data.length > 0 ? (
                  data.map((item) => (
                    <>
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.created_at}
                        </td>

                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            item.status_pembayaran === 0
                              ? "text-red-500 font-bold"
                              : "text-green-600 font-bold"
                          }`}
                        >
                          {item.status_pembayaran === 0
                            ? "Belum bayar"
                            : "Lunas"}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            item.status_pengiriman !== "TERKIRIM"
                              ? "text-red-500 font-bold"
                              : "text-green-600 font-bold"
                          }`}
                        >
                          {item.status_pengiriman}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Rp {item.total_harga}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.status_pembayaran === 1 &&
                          item.status_pengiriman === "TERKIRIM" ? (
                            <div className="flex justify-center gap-2 mt-2">
                              <Link href="/list-product">
                                <button className="block p-2 text-sm font-medium text-orange-500 border-orange-500 hover:bg-orange-400 border rounded-md hover:text-white">
                                  Beli Lagi
                                </button>
                              </Link>
                            </div>
                          ) : item.status_pembayaran === 0 &&
                            item.bukti_pembayaran === "" ? (
                            <ModalUploadBayar
                              user_id={user_id}
                              id={item.id}
                              total_harga={item.total_harga}
                              status_pembayaran={item.status_pembayaran}
                              status_pengiriman={item.status_pengiriman}
                              alamat_id={item.alamat_id}
                              kode_promo={item.kode_promo}
                              tanggal={item.tanggal}
                              fetchList={fetchList}
                            />
                          ) : item.status_pembayaran === 1 &&
                            item.status_pengiriman === "belum dikirim" ? (
                            <button className="block p-2 text-sm font-medium text-orange-500 border-orange-500 hover:bg-orange-400 border rounded-md hover:text-white">
                              Menunggu pengiriman
                            </button>
                          ) : (
                            <button className="block p-2 text-sm font-medium text-orange-500 border-orange-500 hover:bg-orange-400 border rounded-md hover:text-white">
                              Menunggu konfirmasi
                            </button>
                          )}
                        </td>
                      </tr>
                      {item.barang_keluar.length > 0 &&
                        item.barang_keluar.map((itm, index) => (
                          <tr key={index} className="bg-gray-100 border">
                            <td>Barang {index + 1}</td>
                            <td>{itm.produk.nama}</td>
                            <td>{itm.jumlah} pcs</td>
                            <td>Warna : {itm.variant.warna}</td>
                            <td>
                              {item.status_pembayaran === 1 &&
                              item.status_pengiriman === "TERKIRIM" ? (
                                <Link
                                  className="flex justify-center opacity-50"
                                  href={`/review-product/insert/${itm.variant.produk.id}`}
                                >
                                  <button className="w-[70%] block p-2 text-sm font-medium text-orange-500 border-orange-500 hover:bg-orange-400 border rounded-md hover:text-white">
                                    Nilai
                                  </button>
                                </Link>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4">
                      Data tidak ada
                    </td>
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

export default OrderListComp;
