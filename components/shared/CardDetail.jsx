import { useState } from "react";

export default function CardDetail({
	variant,
	nama,
	kategori,
	handleKeranjang,
	handleWishlist,
	loading,
}) {
	const [stock, setStock] = useState(null);
	const [color, setColor] = useState(null);
	const [arrayColor, setArrayColor] = useState([
		...new Set(variant.map((item) => item.warna)),
	]);
	const [id, setId] = useState(null);
	const [harga, setHarga] = useState(null);
	const [arraySize, setArraySize] = useState(null);

	const initialArraySize = [...new Set(variant.map((item) => item.ukuran))];
	// const initialArraySize = [];
	// search harga terendah - tertinggi
	const arrayHarga = variant.map((item) => item.harga);
	const hargaTerendah = Math.min(...arrayHarga);
	const hargaTertinggi = Math.max(...arrayHarga);
	const hargaFormatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});

	const initialHarga =
		hargaTerendah !== hargaTertinggi
			? `${hargaFormatter.format(hargaTerendah)} ~ ${hargaFormatter.format(
					hargaTertinggi
			  )}`
			: hargaFormatter.format(hargaTerendah);

	const handleColorChange = (color) => {
		setColor(color);
		const filtered = variant.filter((item) => item.warna === color);
		setArraySize(
			filtered.map((item) => ({ ukuran: item.ukuran, id: item.id }))
		);
	};

	const handlePickSize = (id) => {
		setId(id);
		const filtered = variant.filter((item) => item.id === id);
		setStock(filtered[0].stok);
		setHarga(filtered[0].harga);
	};

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
		alert("Link Produk berhasil di copy");
	};

	return (
		<div>
			<div className="flex flex-col bg-white px-8 gap-1 max-w-md xl:max-w-xl lg:mt-[4.2rem] lg:py-8 rounded-xl lg:shadow-lg">
				<span className="text-sm lg:text-base text-slate-600">{kategori}</span>
				<h1 className="text-2xl lg:text-3xl text-slate-900 font-bold">
					{nama}
				</h1>
				<span className="text-xl font-bold text-orange-500">
					{harga !== null ? hargaFormatter.format(harga) : initialHarga}
				</span>
				<span
					className={`text-sm lg:text-base text-slate-600 ${
						stock == null ? "font-normal" : "font-bold"
					}`}>
					Stock :
					{stock !== null ? stock : "Pilih Warna dan Ukuran terlebih dahulu"}{" "}
				</span>
				<span className="text-sm lg:text-base text-slate-600">Warna :</span>
				<div className="flex gap-4 my-2 flex-wrap">
					{arrayColor.map((item, index) => (
						<button
							key={index}
							onClick={() => handleColorChange(item)}
							className={`${
								color == item ? "bg-gray-400" : "bg-gray-50"
							} px-4 py-2 rounded-lg hover:bg-gray-400 text-black `}>
							<span className="text-sm lg:text-base font-semibold">{item}</span>
						</button>
					))}
				</div>
				<span className="text-sm lg:text-base text-slate-600">Ukuran</span>
				<div className="flex gap-4 my-2 flex-wrap">
					{arraySize !== null
						? arraySize.map((item, index) => (
								<button
									key={index}
									onClick={() => handlePickSize(item.id)}
									className={`${
										id == item.id ? "bg-gray-400" : "bg-gray-50"
									} px-4 py-2 rounded-lg hover:bg-gray-400`}>
									<span className="text-sm lg:text-base  text-black">
										{item.ukuran}
									</span>
								</button>
						  ))
						: initialArraySize.map((item, index) => (
								<button
									key={index}
									className="bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-400">
									<span className="text-sm lg:text-base  text-black">
										{item}
									</span>
								</button>
						  ))}
				</div>
				di
				<button
					onClick={() => handleKeranjang(id)}
					className={`${
						id == null || loading ? "bg-gray-400" : "bg-orange-600"
					} text-white font-bold w-full flex justify-center py-3 my-2 rounded-xl `}
					disabled={id == null || loading}>
					{loading ? "Loading" : "Tambah Ke keranjang"}
				</button>
				<div className="bg-gray-200 w-full flex flex-col rounded-xl px-4 py-4 gap-4 text-black ">
					<div className="flex gap-4 items-center">
						<div className="rounded-full border-2 border-black px-2 py-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2em"
								height="2em"
								viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M18 18.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5z"
								/>
							</svg>
						</div>
						<div className="text-black text-sm flex flex-col">
							<span>Gratis Pengiriman</span>
							<span>
								Selalu dapatkan gratis pengririman ke seleruh daerah di
								indonesia
							</span>
						</div>
					</div>
					<div className="flex gap-4 items-center">
						<div className="rounded-full border-2 border-black px-2 py-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2em"
								height="2em"
								viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M21 11c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4l9 4zm-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m-2-4l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9"
								/>
							</svg>
						</div>
						<div className="text-black text-sm flex flex-col">
							<span>Garansi 1 Tahun</span>
							<span>
								Dapatkan Garansi untuk Semua Produk sampai dengan 1 Tahun
								setelah Pembelanjaan
							</span>
						</div>
					</div>
				</div>
				<div className="flex py-4">
					<button
						onClick={handleWishlist}
						className="flex flex-wrap text-gray-500 py-2 px-2 justify-center items-center gap-2 w-full border-r-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1.5em"
							height="1.5em"
							viewBox="0 0 24 24">
							<path
								fill="grey"
								d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"></path>
						</svg>
						<span>
							Tambah ke <br /> Wishlist
						</span>
					</button>
					<button
						onClick={handleCopyToClipboard}
						className="flex text-gray-500 py-2 px-4 justify-center items-center gap-1 w-full border-l-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1.5em"
							height="1.5em"
							viewBox="0 0 24 24">
							<path
								fill="grey"
								d="M18 22q-1.25 0-2.125-.875T15 19q0-.175.025-.363t.075-.337l-7.05-4.1q-.425.375-.95.588T6 15q-1.25 0-2.125-.875T3 12q0-1.25.875-2.125T6 9q.575 0 1.1.213t.95.587l7.05-4.1q-.05-.15-.075-.337T15 5q0-1.25.875-2.125T18 2q1.25 0 2.125.875T21 5q0 1.25-.875 2.125T18 8q-.575 0-1.1-.212t-.95-.588L8.9 11.3q.05.15.075.338T9 12q0 .175-.025.363T8.9 12.7l7.05 4.1q.425-.375.95-.587T18 16q1.25 0 2.125.875T21 19q0 1.25-.875 2.125T18 22"></path>
						</svg>
						<span>
							Bagikan Link <br /> Produk
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
