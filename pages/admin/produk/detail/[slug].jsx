import Loading from "@/components/Loading";
import GambarProdukCard from "@/components/admin/GambarProdukCard";
import TableVariant from "@/components/admin/TableVariant";
import useAuthStore from "@/stores/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Index({ slug }) {
	const { user } = useAuthStore();
	const router = useRouter();
	const { data, isLoading, mutate } = useSWR(
		`${host}/produk/${slug}`,
		fetcher
	);

	const handleEditProduk = () => {
		router.push(`/admin/produk/edit/${slug}`);
	};

	const handleTambahVariant = (id) => {
		router.push(`/admin/variant/create/${id}`);
	};

	const handleEditVariant = (id) => {
		router.push(`/admin/variant/edit/${id}`);
	};

	const handleDeleteVariant = async (id) => {
		if (confirm("Apakah anda yakin ingin menghapus data Variant ini?")) {
			try {
				const response = await axios.delete(
					`${host}/variant/${id}`,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				toast.success(response.data.message);
				mutate();
			} catch (error) {
				toast.error(error.response.data.message);
			}
		}
	};

	const handleCreateGambar = (id) => {
		router.push(`/admin/gambar/create/${id}`);
	};

	const handleEditGambar = (id) => {
		router.push(`/admin/gambar/edit/${id}`);
	};

	const handleDeleteGambar = async (id) => {
		if (confirm("Apakah anda yakin ingin menghapus data Gambar ini?")) {
			try {
				const response = await axios.delete(
					`${host}/gambar/${id}`,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				toast.success(response.data.message);
				mutate();
			} catch (error) {
				toast.error(error.response.data.message);
			}
		}
	};

	if (isLoading) return <Loading />;

	return (
		<div className="flex flex-col pt-32 px-32 text-black gap-10 bg-gray-100  ">
			<Toaster position="top-center" />
			<div className="bg-white px-4 py-8 rounded-3xl drop-shadow-xl">
				<div className="flex flex-col w-full gap-16 mb-8 ">
					<h1 className="text-4xl font-semibold text-center">Detail Produk </h1>
				</div>
				<div className="flex flx-col lg:flex-row lg:gap-10 lg:justify-around">
					<div className="flex flex-col gap-4 lg:w-1/2">
						<div className="flex gap-4 text-xl">
							<span className="font-semibold">Nama Produk :</span>
							<span>{data?.data.nama}</span>
						</div>
						<div className="flex gap-2 flex-col text-xl">
							<span className="font-semibold ">Deskripsi :</span>
							<span className="text-justify">{data.data.deskripsi}</span>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex gap-4 text-xl">
							<span className="font-semibold">Berat :</span>
							<span>{data.data.berat}</span>
						</div>
						<div className="flex gap-4 text-xl">
							<span className="font-semibold">Material :</span>
							<span>{data.data.material}</span>
						</div>
						<div className="flex gap-4 text-xl">
							<span className="font-semibold">Dimension :</span>
							<span>{data.data.dimension}</span>
						</div>
						<div className="flex gap-4 text-xl">
							<span className="font-semibold">Display :</span>
							<span>{data.data.display === 1 ? "Tampil" : "Tidak Tampil"}</span>
						</div>
						<button
							onClick={handleEditProduk}
							className="btn btn-primary w-48 text-primary-content">
							Edit Produk
						</button>
					</div>
				</div>
			</div>

			<div className="gambar flex flex-col gap-4 bg-white px-4 py-8 rounded-3xl drop-shadow-xl ">
				<h1 className="text-2xl font-semibold text-center">Gambar Produk </h1>
				<button
					onClick={() => handleCreateGambar(data.data.id)}
					className="btn btn-primary w-48 text-primary-content ml-8">
					TAMBAH GAMBAR
				</button>

				{data.data.gambar !== null && data.data.gambar.length > 0 ? (
					<GambarProdukCard
						data={data.data.gambar}
						handleEdit={handleEditGambar}
						handleDelete={handleDeleteGambar}
					/>
				) : (
					<div className="text-2xl">Belum ada gambar</div>
				)}
			</div>

			<div className="variant flex flex-col gap-4 bg-white px-8 py-8 rounded-3xl shadow-xl mb-8">
				<h1 className="text-2xl font-semibold text-center">Daftar Variant </h1>
				<button
					onClick={() => handleTambahVariant(data.data.id)}
					className="btn btn-primary w-48 mx-16 text-primary-content">
					TAMBAH VARIANT
				</button>
				<div className="px-16 flex justify-center">
					{data.data.variant.length > 0 ? (
						<TableVariant
							data={data.data.variant}
							handleEdit={handleEditVariant}
							handleDelete={handleDeleteVariant}
						/>
					) : (
						<div className="text-2xl">Belum ada variant</div>
					)}
				</div>
			</div>
		</div>
	);
}

export function getServerSideProps(context) {
	const { slug } = context.query;
	if (typeof slug == "number") {
	}
	return {
		props: {
			slug,
		},
	};
}
