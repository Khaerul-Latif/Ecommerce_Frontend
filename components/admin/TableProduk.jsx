import index from "@/pages/admin";
import Image from "next/image";
import React from "react";

export default function TableProduk({
	data,
	page,
	size,
	handleDetail,
	handleDelete,
	handleEdit,
}) {
	const start = (page - 1) * size;
	const end = page * size;
	const dataPage = data.slice(start, end);

	return (
		<div className="overflow-x-auto">
			<table className="table">
				{/* head */}
				<thead>
					<tr className="text-black text-base">
						<th></th>
						<th>Gambar</th>
						<th>Nama</th>
						<th>Kategori</th>
						<th>Display</th>
						<th>Jumlah Variant</th>
						<th>Jumlah Gambar</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{dataPage.map((produk, index) => {
						let nomor = start + index + 1;
						return (
							<tr key={produk.id} className="hover:bg-gray-200">
								<td>{nomor}</td>
								<td>
									{produk.gambar.length > 0 ? (
										<Image
											src={produk.gambar[0].url}
											width={150}
											height={170}></Image>
									) : (
										<p>Belum ada gambar</p>
									)}
								</td>
								<td onClick={() => handleDetail(produk.slug)}>{produk.nama}</td>
								<td onClick={() => handleDetail(produk.slug)}>
									{produk.kategori}
								</td>
								<td onClick={() => handleDetail(produk.slug)}>
									{produk.display ? "ditampilkan" : "tidak ditampilkan"}
								</td>
								<td onClick={() => handleDetail(produk.slug)}>
									{produk.variant.length}
								</td>
								<td onClick={() => handleDetail(produk.slug)}>
									{produk.gambar.length}
								</td>
								<td>
									<button
										onClick={() => {
											handleEdit(produk.slug);
										}}
										className="btn btn-primary">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1.5em"
											height="1.5em"
											viewBox="0 0 24 24">
											<g
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}>
												<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
												<path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z"></path>
											</g>
										</svg>
									</button>
									<button
										onClick={() => {
											handleDelete(produk.id);
										}}
										className="btn btn-error mx-6">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1.5em"
											height="1.5em"
											viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"></path>
										</svg>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
