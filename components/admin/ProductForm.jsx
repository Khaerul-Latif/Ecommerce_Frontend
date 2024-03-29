import useAuthStore from "@/stores/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { host } from "@/utils/constant";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ProductForm({ slug }) {
  const { user } = useAuthStore();
  const { data, isLoading } = useSWR(
    slug ? `${host}/produk/${slug}` : null,
    fetcher
  );

  const router = useRouter();

  const [nama, setNama] = useState("");
  const [kategori_id, setKategoriId] = useState("0");
  const [deskripsi, setDeskripsi] = useState("");
  const [dimension, setDimension] = useState("");
  const [berat, setBerat] = useState("");
  const [material, setMaterial] = useState("");
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState([]);
  const [getData, setGetData] = useState(slug ? true : false);

  const categories = useSWR(`${host}/kategori`, fetcher);

  useEffect(() => {
    if (slug && getData) {
      if (data?.data) {
        setNama(data.data.nama);
        setKategoriId(data.data.kategori_id);
        setDeskripsi(data.data.deskripsi);
        setDimension(data.data.dimension);
        setBerat(data.data.berat);
        setMaterial(data.data.material);
        setDisplay(data.data.display);
        setGetData(false);
      }
    }
  }, [data, getData, slug]);

  if (isLoading || categories.isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (slug) {
      try {
        const response = await axios.put(
          `${host}/produk/${data.data.id}`,
          {
            nama: nama,
            kategori_id: kategori_id,
            deskripsi: deskripsi,
            dimension: dimension,
            berat: berat,
            material: material,
            display: display,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Data Produk Berhasil Diupdate");
        router.push("/admin/produk");
      } catch (error) {
        toast.error("Gagal menambahkan data produk");
        if (error.response.data.errors) {
          let arrayError = [];
          for (const key in error.response.data.errors) {
            arrayError.push(error.response.data.errors[key]);
          }
          setError(arrayError);
        } else {
          setError([error.response.data.message]);
        }
      }
    } else {
      try {
        const response = await axios.post(
          `${host}/produk`,
          {
            nama: nama,
            kategori_id: kategori_id,
            deskripsi: deskripsi,
            dimension: dimension,
            berat: berat,
            material: material,
            display: display,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Data Produk Berhasil Ditambahkan");
        router.push("/admin/produk");
      } catch (error) {
        toast.error("Gagal menambahkan data produk");
        if (error.response.data.errors) {
          let arrayError = [];
          for (const key in error.response.data.errors) {
            arrayError.push(error.response.data.errors[key]);
          }
          setError(arrayError);
        } else {
          setError([error.response.data.message]);
        }
      }
    }
  };

  return (
    <div className="flex-flex-col pt-32 px-16 text-black gap-10">
      <Toaster position="top-center" />
      <h1 className="font-bold text-2xl">
        {slug ? `Update Data Produk ${data.data.nama}` : "Tambah Data Produk"}
      </h1>
      {error.length > 0 &&
        error.map((err, index) => (
          <div key={index} role="alert" className="alert alert-error my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{err}</span>
          </div>
        ))}
      <form className="flex flex-col gap-5">
        <div className="flex  flex-wrap w-full">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text text-lg text-black">Nama</span>
              </div>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
              />
            </label>

            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text text-lg text-black">Kategori</span>
              </div>
              <select
                className="select select-bordered w-full max-w-md bg-white text-black focus:border-primary border-black focus:ring-primary"
                value={kategori_id}
                onChange={(e) => setKategoriId(e.target.value)}
              >
                <option value="0" disabled>
                  Pilih Kategori
                </option>
                {categories.data.data.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.nama}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text text-lg text-black">Deskripsi</span>
              </div>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                cols={30}
                rows={10}
                placeholder="Type here"
                className="textarea textarea-bordered w-full max-w-lg border-black bg-white text-black focus:border-primary focus:ring-primary"
              />
            </label>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text text-lg text-black">Dimensi</span>
              </div>
              <input
                type="text"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
              />
            </label>

            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text text-lg text-black">Berat</span>
              </div>
              <input
                type="number"
                value={berat}
                onChange={(e) => setBerat(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
              />
            </label>

            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text text-lg text-black">Material</span>
              </div>

              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
              />
            </label>

            <label className="form-control w-full max-w-md ">
              <div className="label">
                <span className="label-text text-lg text-black">Display</span>
              </div>
              <select
                className="select select-bordered w-full max-w-md bg-white text-black focus:border-primary border-black focus:ring-primary"
                value={display}
                onChange={(e) => setDisplay(e.target.value)}
              >
                <option value="0">Tidak Ditampilkan</option>
                <option value="1">Tampilkan</option>
              </select>
            </label>
          </div>
        </div>

        <button
          className="btn btn-primary w-48 text-primary-content"
          onClick={handleSubmit}
        >
          {slug ? "Update" : "Tambah"}
        </button>
      </form>
    </div>
  );
}
