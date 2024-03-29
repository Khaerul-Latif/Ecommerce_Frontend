import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsCartPlus } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/auth";
import useSWR from "swr";
import Loading from "@/components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { host } from "@/utils/constant";

export default function Index() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [wishlist, setWishlist] = useState({ get: true, data: [] });

  const fetcher = (url) =>
    axios
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => res.data);
  const { data, error, isLoading, mutate } = useSWR(
    `${host}/wishlist`,
    fetcher
  );

  if (isLoading) {
    return <Loading />; // Tampilkan indikator loading
  }
  if (error) {
    if (error.response && error.response.status === 401) {
      router.push("/login");
      window.alert("You Must Login First");
    }
    return <Loading />; // Tampilkan indikator loading
  }
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete this product?")) {
        await axios.delete(`${host}/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("Delete Success");
      }
    } catch (error) {
      toast.error("Error Can't Deleted");
    }
  };

  const handleKeranjang = async (slug) => {
    router.push(`/detail/${slug}`);
  };

  return (
    <main
      className={`flex min-h-screen flex-col bg-gray items-center md:mx-40 mx-4 pt-24`}
    >
      <Toaster />
      <div className="flex flex-col h-full bg-white w-full md:m-5 m-0 pb-10">
        <div className="text-2xl font-semibold p-5">Wishlist</div>
        <div className="flex flex-col">
          {data?.data.map((product, index) => {
            return (
              <div
                key={index}
                className="flex flex-col text-sm font-semibold mx-0 md:mx-5 mt-5 py-0 md:py-5 bg-gray-200 rounded-lg"
              >
                <div className="ml-2 md:ml-14">{product.produk.title}</div>
                <div className="flex flex-row">
                  <div className="ml-1 md:ml-10">
                    <Image
                      src={product.produk.gambar[0].url}
                      alt=""
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="flex md:flex-row flex-col justify-between w-full mx-5">
                    <div className="flex flex-col pr-5 md:text-lg text-xs">
                      <div className="font-semibold">{product.produk.nama}</div>
                      <div className="font-light">
                        {product.produk.deskripsi
                          .split(" ")
                          .slice(0, 30)
                          .join(" ")}
                        {product.produk.deskripsi.split(" ").length > 30 &&
                          "..."}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                      <div>{/* Rp. {product.harga} */}</div>
                      <div>
                        <div className="flex justify-center items-center">
                          <FaRegTrashAlt
                            onClick={() => handleDelete(product.id)}
                            className="mr-5 hover:bg-red-600 hover:cursor-pointer"
                          />
                          <button
                            onClick={() => handleKeranjang(product.produk.slug)}
                            className="w-auto bg-white text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded-md hover:bg-green-100 focus:outline-none focus:border-gray-500 focus:shadow-outline"
                          >
                            <BsCartPlus className="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
