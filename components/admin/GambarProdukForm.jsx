import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Loading from "../Loading";
import useAuthStore from "@/stores/auth";
import Axios from "@/api";
import Image from "next/image";
import { cloudName, host, uploadPreset } from "@/utils/constant";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function GambarProdukForm({ id_product, id_gambar, formType }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [gambar, setGambar] = useState(null);
  const [getData, setGetData] = useState(true);
  const [idProduct, setIdProduct] = useState(id_product || "");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState([]);
  const { data, isLoading } = useSWR(
    id_gambar ? `${host}/gambar/${id_gambar}` : null,
    fetcher
  );

  useEffect(() => {
    if (id_gambar && getData) {
      if (data?.data) {
        setPreview(data.data.url);
        setIdProduct(data.data.produk_id);
        setGetData(false);
      }
    }
  }, [data, getData, id_gambar]);

  const handleImageChange = (e) => {
    setGambar(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = new FormData();
    image.append("file", gambar);
    image.append("cloud_name", cloudName);
    image.append("upload_preset", uploadPreset);
    try {
      if (formType == "update") {
        const cloudinaryResponse = await Axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          image
        );
        const imageURL = cloudinaryResponse.data.secure_url;
        const response = await axios.put(
          `${host}/gambar/${id_gambar}`,
          {
            produk_id: idProduct,
            url: imageURL,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const slug = response.data.data.produk_slug;
        toast.success("Gambar produk berhasil diupdate");
        router.push("/admin/produk/detail/" + slug);
      } else {
        const cloudinaryResponse = await Axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          image
        );
        const imageURL = cloudinaryResponse.data.secure_url;

        const response = await axios.post(
          `${host}/gambar`,
          {
            produk_id: idProduct,
            url: imageURL,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const slug = response.data.data.produk_slug;
        toast.success("Gambar produk berhasil ditambahkan");
        router.push("/admin/produk/detail/" + slug);
      }
    } catch (error) {
      toast.error("Gagal menambahkan variant");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex-flex-col pt-32 px-16 text-black gap-10">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold">
        {formType === "update"
          ? `Update Gambar  dengan id Produk : ${idProduct} `
          : `Tambah Gambar dengan id Produk : ${idProduct}`}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-lg text-black">
              Masukan Gambar
            </span>
          </div>
          <input
            onChange={handleImageChange}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs bg-white"
          />
        </label>

        {preview && (
          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-lg text-black">
                Preview Gambar
              </span>
            </div>
            <Image
              src={preview}
              alt="preview"
              width={200}
              height={300}
              className="w-[200px] h-auto"
            />
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary w-44 disabled:bg-gray-300"
          disabled={gambar == null}
        >
          {formType === "update" ? "Update" : "Tambah"}
        </button>
      </form>
    </div>
  );
}
