import AuthCard from "@/components/shared/AuthCard";
import CardDetail from "@/components/shared/CardDetail";
import CorousalImage from "@/components/shared/CorousalImage";
import ErrorDetailProduk from "@/components/shared/ErrorDetailProduk";
import Loading from "@/components/Loading";
import ReviewProduk from "@/components/ReviewProduk";
import TentangProduk from "@/components/TentangProduk";
import useAuthStore from "@/stores/auth";
import { DataContext } from "@/stores/Context";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { host } from "@/utils/constant";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Index({ slug }) {
  const { user } = useAuthStore();
  const [auth, setAuth] = useState(false);
  const { setAndStoreData } = useContext(DataContext);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useSWR(`${host}/produk/${slug}`, fetcher);

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <ErrorDetailProduk
        code={error.response.status}
        message={error.response.data.message}
      />
    );
  }

  const handleKeranjang = async (id) => {
    if (!user) {
      toast.error("Silahkan login terlebih dahulu");
      setAuth(true);
    } else {
      setLoading(true);
      try {
        const response = await axios.post(
          `${host}/keranjang`,
          {
            variant_id: id,
            jumlah: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Berhasil menambahkan ke keranjang");
        // set isi keranjang
        const resKeranjang = await axios.get(`${host}/keranjang`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // set resKeranjang ke dalam state context keranjang
        const keranjang = resKeranjang.data.data;
        await setAndStoreData(keranjang);
        window.location.reload();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // <<<<<<< HEAD
  const handleWishlist = async () => {
    if (!user) {
      setAuth(true);
    } else {
      try {
        const response = await axios.post(
          `${host}/wishlist`,
          {
            produk_id: data.data.id,
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
    <>
      {!auth ? null : <AuthCard setAuth={setAuth} />}
      <main className="bg-gray-200 lg:px-48 md:pt-8 lg:pt-32 lg:pb-8">
        <Toaster />
        <div className="bg-white flex-col py-4 rounded-3xl">
          <div className="flex flex-col lg:flex-row lg:gap-4 l lg:px-4 xl:gap-8 lg:justify-center 2xl:justify-between 2xl:px-10">
            <CorousalImage gambar={data.data.gambar} />
            <CardDetail
              variant={data.data.variant}
              nama={data.data.nama}
              kategori={data.data.kategori}
              handleKeranjang={handleKeranjang}
              handleWishlist={handleWishlist}
              loading={loading}
            />
          </div>
          <div className="lg:px-16">
            <TentangProduk
              deskripsi={data.data.deskripsi}
              dimension={data.data.dimension}
              weight={data.data.berat}
              material={data.data.material}
            />
            <ReviewProduk data={data.data.review} />
          </div>
        </div>
      </main>
    </>
  );
  // const handleWishlist = async () => {
  // 	if (!user) {
  // 		setAuth(true);
  // 	} else {
  // 		try {
  // 			const response = await axios.post(
  // 				`${host}/wishlist`,
  // 				{
  // 					produk_id: data.data.id,
  // 				},
  // 				{
  // 					headers: {
  // 						Authorization: `Bearer ${user.token}`,
  // 					},
  // 				}
  // 			);
  // 			toast.success("Berhasil menambahkan ke wishlist");
  // 		} catch (error) {
  // 			toast.error(error.response.data.message);
  // 		}
  // 	}
  // };
  // return (
  // 	<>
  // 		{!auth ? null : <AuthCard setAuth={setAuth} />}
  // 		<main className="bg-gray-200 lg:px-48 md:pt-8 lg:pt-32 lg:pb-8">
  // 			<Toaster />
  // 			<div className="bg-white flex-col py-4 rounded-3xl">
  // 				<div className="flex flex-col lg:flex-row lg:gap-4  lg:px-4 xl:gap-8 lg:justify-center 2xl:justify-between 2xl:px-10">
  // 					{data.data.gambar.length > 0 ? (
  // 						<CorousalImage gambar={data.data.gambar} />
  // 					) : (
  // 						<div className="flex justify-center items-center gap-2 lg:self-start text-black max-w-md w-full m-auto">
  // 							<p>Image not found</p>
  // 						</div>
  // 					)}
  // 					<CardDetail
  // 						variant={data.data.variant}
  // 						nama={data.data.nama}
  // 						kategori={data.data.kategori}
  // 						handleKeranjang={handleKeranjang}
  // 						handleWishlist={handleWishlist}
  // 						loading={loading}
  // 					/>
  // 				</div>
  // 				<div className="lg:px-16">
  // 					<TentangProduk
  // 						deskripsi={data.data.deskripsi}
  // 						dimension={data.data.dimension}
  // 						weight={data.data.berat}
  // 						material={data.data.material}
  // 					/>
  // 					<ReviewProduk data={data.data.review} />
  // 				</div>
  // 			</div>
  // 		</main>
  // 	</>
  // );
  // >>>>>>> da48e829a6c7c73a7ef9c2edbabb2c9cc7b82dfd
}

export function getServerSideProps(context) {
  const { slug } = context.query;
  return {
    props: {
      slug,
    },
  };
}
