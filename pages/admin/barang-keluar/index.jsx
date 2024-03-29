import Loading from "@/components/Loading";
import ModalBarangKeluar from "@/components/admin/barang-keluar/ModalBarangKeluar";
import useAuthStore from "@/stores/auth";
import { host } from "@/utils/constant";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

const Index = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => res.data.data);

  const {
    data: barang,
    error,
    isLoading,
  } = useSWR(`${host}/barang-keluar`, fetcher);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Apakah yakin akan menghapus data ini?"
      );
      if (confirmDelete) {
        await axios.delete(`${host}/barang-keluar/${id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success("Data list barang keluar berhasil dihapus...");
      } else {
        toast.error("Data list barang keluar batal dihapus...");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const hargaFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative pt-[100px] justify-center min-h-screen items-center">
      <Toaster position="top-center" />
      <div className="card w-full glass">
        <h1 className="mx-10 mt-10 card-title">List Barang Keluar</h1>
        <div className="overflow-x-auto card-body">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No.</th>
                <th>ID Transaksi</th>
                <th>Produk</th>
                <th>Variant</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barang && barang.length > 0 ? (
                barang.map((item, index) => {
                  let harga;
                  {
                    item.transaksi
                      ? (harga = item.transaksi.total_harga)
                      : (harga = "0");
                  }
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.transaksi_id}</td>
                      <td>{item.variant.produk.nama}</td>
                      <td>{item.variant.warna}</td>
                      <td>{item.jumlah}</td>
                      <td>{hargaFormatter.format(harga)},-</td>
                      <td>
                        <ModalBarangKeluar
                          id={item.id}
                          jmlh={item.jumlah}
                          transaksi_id={item.transaksi_id}
                          harga={item.harga}
                          variant_id={item.variant_id}
                        />
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="btn btn-error mx-6"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="font-bold text-center">
                    Belum Ada Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
