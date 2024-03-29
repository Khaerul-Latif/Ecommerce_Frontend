import React from "react";
import axios from "axios";
import useSWR from "swr";
import { host } from "@/utils/constant";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function FilterProduk({
	nama,
	setNama,
	kategori,
	setKategori,
	handleFilter,
}) {
	const { data, isLoading } = useSWR(
		`${host}/kategori`,
		fetcher
	);

	if (isLoading) return <div>Loading...</div>;
	return (
		<div className="flex flex-col">
			<h2 className="text-black text-xl font-semibold">Filter Data :</h2>
			<form className="flex flex-wrap gap-4 items-end" onSubmit={handleFilter}>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-lg text-black">Nama</span>
					</div>
					<input
						type="text"
						value={nama}
						onChange={(e) => setNama(e.target.value)}
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs border-black bg-white text-black focus:border-primary focus:ring-primary"
					/>
				</label>

				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-lg text-black">Kategori</span>
					</div>
					<select
						className="select select-bordered w-full max-w-xs bg-white text-black focus:border-primary border-black focus:ring-primary"
						value={kategori}
						onChange={(e) => setKategori(e.target.value)}>
						<option value="0">All</option>
						{data.data?.map((kategori) => (
							<option key={kategori.id} value={kategori.id}>
								{kategori.nama}
							</option>
						))}
					</select>
				</label>
				<button
					onSubmit={handleFilter}
					className="btn btn-primary w-48 text-primary-content">
					Filter
				</button>
			</form>
		</div>
	);
}
