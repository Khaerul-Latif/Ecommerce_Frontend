import { host } from "@/utils/constant";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import ProdukItem from "./ProdukItem";
import Filter from "./Filter";
import HeroSection from "./HeroSection";
import useAuthStore from "@/stores/auth";
import AuthCard from "../shared/AuthCard";
import toast, { Toaster } from "react-hot-toast";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const Main = () => {
  const { user } = useAuthStore();
  const { data: produk, error } = useSWR(`${host}/produk`, fetcher);
  const { data: produkbydate, error: errorprodukbydate } = useSWR(
    `${host}/produk?sortName=asc`,
    fetcher
  );
  const { data: produkbysepatu, error: errorprodukbysepatu } = useSWR(
    `${host}/produk?kategori_id=1`,
    fetcher
  );
  const { data: produkbyjaket, error: errorprodukbyjaket } = useSWR(
    `${host}/produk?kategori_id=2`,
    fetcher
  );
  const { data: produkbytas, error: errorprodukbytas } = useSWR(
    `${host}/produk?kategori_id=3`,
    fetcher
  );
  const [auth, setAuth] = useState(false);

  const addwishlist = async (id) => {
    if (!user) {
      toast.error("Silahkan login terlebih dahulu");
      setAuth(true);
    } else {
      try {
        await axios.post(
          `${host}/wishlist`,
          {
            produk_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        toast.success("Berhasil menambahkan ke wishlist");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {!auth ? null : <AuthCard setAuth={setAuth} />}
      <Toaster />
      <HeroSection />
      <Filter
        produk={produkbydate}
        titleItem={"Kategori"}
        addwishlist={addwishlist}
      />
      <ProdukItem
        produk={produkbydate}
        titleItem={"Produk Terbaru!"}
        addwishlist={addwishlist}
      />
      <ProdukItem
        produk={produk}
        titleItem={"Produk Terpopuler!"}
        addwishlist={addwishlist}
      />
      <ProdukItem
        produk={produkbysepatu}
        titleItem={"Sepatu"}
        addwishlist={addwishlist}
      />
      {produkbyjaket && produkbyjaket.length !== 0 && (
        <ProdukItem
          produk={produkbyjaket}
          titleItem={"Jaket"}
          addwishlist={addwishlist}
        />
      )}
      {produkbytas && produkbytas.length !== 0 && (
        <ProdukItem
          produk={produkbytas}
          titleItem={"Tas"}
          addwishlist={addwishlist}
        />
      )}
    </div>
  );
};

export default Main;
