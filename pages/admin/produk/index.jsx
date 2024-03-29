import Loading from "@/components/Loading";
import FilterProduk from "@/components/admin/FilterProduk";
import PaginationProduk from "@/components/admin/PaginationProduk";
import TableProduk from "@/components/admin/TableProduk";
import useAuthStore from "@/stores/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Index({ data }) {
	const { user } = useAuthStore();
	const router = useRouter();
	const [page, setPage] = useState(router.query.page || 1);
	const [size, setSize] = useState(router.query.size || 15);
	const [kategori_id, setKategoriId] = useState(router.query.kategori_id || 0);
	const [nama, setNama] = useState(router.query.nama || "");
	const [filter, setFilter] = useState(true);

	const handleCreate = () => {
		router.push("/admin/produk/create");
	};

	const handleFilter = (e) => {
		e.preventDefault();
		router.push(
			`/admin/produk?page=${page}&size=${size}${
				kategori_id !== 0 ? `&kategori_id=${kategori_id}` : ""
			}${nama !== "" ? `&nama=${nama}` : ""}`
		);
	};

	const handleEdit = (slug) => {
		router.push(`/admin/produk/edit/${slug}`);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Apakah anda yakin ingin menghapus produk ini?")) {
			try {
				const responser = await axios.delete(
					`${host}/produk/${id}`,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				toast.success("Berhasil menghapus produk");
				router.push("/admin/produk");
			} catch (error) {
				toast.error("Gagal menghapus produk");
			}
		}
	};

	const handleDetail = (slug) => {
		router.push(`/admin/produk/detail/${slug}`);
	};

	const handleSize = (e) => {
		setSize(e.target.value);
		setPage(1);
		router.push(
			`/admin/produk?page=${page}&size=${e.target.value}${
				kategori_id !== 0 ? `&kategori_id=${kategori_id}` : ""
			}${nama !== "" ? `&nama=${nama}` : ""}`
		);
	};

	const handleNextPage = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		router.push(
			`/admin/produk?page=${nextPage}&size=${size}${
				kategori_id !== 0 ? `&kategori_id=${kategori_id}` : ""
			}${nama !== "" ? `&nama=${nama}` : ""}`
		);
	};

	const handlePrevPage = () => {
		const nextPage = page - 1;
		setPage(nextPage);
		router.push(
			`/admin/produk?page=${page - 1}&size=${size}${
				kategori_id !== 0 ? `&kategori_id=${kategori_id}` : ""
			}${nama !== "" ? `&nama=${nama}` : ""}`
		);
	};

	return (
		<div className="flex flex-col pt-32 px-32 text-black gap-10">
			<Toaster position="top-center" />
			<h1 className="font-bold text-2xl">Table Produk</h1>
			<button
				className="btn btn-primary w-48 text-primary-content"
				onClick={handleCreate}>
				TAMBAH PRODUK
			</button>
			<FilterProduk
				kategori={kategori_id}
				setKategori={setKategoriId}
				nama={nama}
				setNama={setNama}
				handleFilter={handleFilter}
			/>

			<TableProduk
				data={data.data}
				page={page}
				size={size}
				handleDetail={handleDetail}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>

			<PaginationProduk
				total={data.data.length}
				page={page}
				size={size}
				handleSize={handleSize}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
			/>
		</div>
	);
}

export async function getServerSideProps(context) {
	const kategori_id = context.query.kategori_id || 0;
	const nama = context.query.nama || "";

	const { data } = await axios.get(
		`${host}/produk?kategori_id=${kategori_id}&nama=${nama}`
	);

	return {
		props: { data },
	};
}
