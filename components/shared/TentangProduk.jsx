import React from "react";

export default function TentangProduk({
	deskripsi,
	dimension,
	weight,
	material,

}) {
	return (
		<div className="flex flex-col bg-white text-black px-8 mt-4 max-w-2xl lg:mt-10 ">
			<div className="flex flex-col gap-4 border-b-2 border-black pb-4 lg:pb-16">
				<h1 className="text-lg font-bold lg:text-2xl">Tentang Produk</h1>
				<p className="lg:text-lg">{deskripsi}</p>
			</div>
			<div className="flex flex-col text-black mt-4 mb-6">
				<h1 className="font-bold text-2xl">Detail Teknis</h1>
				<div className="flex w-full px-4 justify-between items-center py-3">
					<span className="text-sm lg:text-base">Dimension</span>
					<span className="text-sm lg:text-base">{dimension}</span>
				</div>
				<div className="flex w-full px-4 justify-between items-center py-3 bg-gray-300">
					<span className="text-sm lg:text-base">Weight</span>
					<span className="text-sm lg:text-base">{weight}</span>
				</div>
				<div className="flex w-full px-4 justify-between items-center py-3">
					<span className="text-sm lg:text-base">Material</span>
					<span className="text-sm lg:text-base">{material}</span>
				</div>
			</div>
		</div>
	);
}
