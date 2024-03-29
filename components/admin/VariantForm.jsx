import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Loading from "../Loading";
import useAuthStore from "@/stores/auth";
import { host } from "@/utils/constant";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function VariantForm({ id_product, id_variant, formType }) {
	const router = useRouter();
	const [warna, setWarna] = useState("");
	const [stok, setStok] = useState("");
	const [harga, setHarga] = useState("");
	const [ukuran, setUkuran] = useState("");
	const [getData, setGetData] = useState(true);
	const [idProduct, setIdProduct] = useState(id_product || "");
	const [error, setError] = useState([]);
	const { user } = useAuthStore();

	const { data, isLoading } = useSWR(
		id_variant
			? `${host}/variant/${id_variant}`
			: null,
		fetcher
	);

	useEffect(() => {
		if (id_variant && getData) {
			if (data?.data) {
				setWarna(data.data.warna);
				setStok(data.data.stok);
				setHarga(data.data.harga);
				setUkuran(data.data.ukuran);
				setIdProduct(data.data.produk_id);
				setGetData(false);
			}
		}
	}, [data, getData, id_variant]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formType === "update") {
				const response = await axios.put(
					`${host}/variant/${id_variant}`,
					{
						produk_id: idProduct,
						warna: warna,
						stok: stok,
						harga: harga,
						ukuran: ukuran,
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				const slug = response.data.data.produk_slug;
				toast.success("Variant Berhasil Ditambahkan");
				router.push("/admin/produk/detail/" + slug);
			} else {
				const response = await axios.post(
					`${host}/variant`,
					{
						produk_id: idProduct,
						warna: warna,
						stok: stok,
						harga: harga,
						ukuran: ukuran,
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				const slug = response.data.data.produk_slug;
				toast.success("Variant Berhasil Ditambahkan");
				router.push("/admin/produk/detail/" + slug);
			}
		} catch (error) {
			toast.error("Gagal menambahkan variant");
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
	};

	if (isLoading) return <Loading />;

	return (
		<div className="flex-flex-col pt-32 px-16 text-black gap-10">
			<Toaster position="top-center" />
			<h1 className="text-2xl font-semibold">
				{formType === "update"
					? `Update Data Variant  dengan id Produk : ${idProduct} `
					: `Tambah Data Variant dengan id Produk : ${idProduct}`}
			</h1>

			{error.length > 0 &&
				error.map((err, index) => (
					<div key={index} role="alert" className="alert alert-error my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24">
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
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<label className="form-control w-full max-w-md">
					<div className="label">
						<span className="label-text text-lg text-black">Warna</span>
					</div>
					<input
						type="text"
						value={warna}
						onChange={(e) => setWarna(e.target.value)}
						placeholder="Type here"
						className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
					/>
				</label>

				<label className="form-control w-full max-w-md">
					<div className="label">
						<span className="label-text text-lg text-black">Ukuran</span>
					</div>
					<input
						type="text"
						value={ukuran}
						onChange={(e) => setUkuran(e.target.value)}
						placeholder="Type here"
						className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
					/>
				</label>

				<label className="form-control w-full max-w-md">
					<div className="label">
						<span className="label-text text-lg text-black">Stok</span>
					</div>
					<input
						type="number"
						value={stok}
						onChange={(e) => setStok(e.target.value)}
						placeholder="Type here"
						className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
					/>
				</label>

				<label className="form-control w-full max-w-md">
					<div className="label">
						<span className="label-text text-lg text-black">Harga</span>
					</div>
					<input
						type="number"
						value={harga}
						onChange={(e) => setHarga(e.target.value)}
						placeholder="Type here"
						className="input input-bordered w-full max-w-md border-black bg-white text-black focus:border-primary focus:ring-primary"
					/>
				</label>

				<button type="submit" className="btn btn-primary w-full max-w-md">
					{formType === "update" ? "Update" : "Tambah"}
				</button>
			</form>
		</div>
	);
}
