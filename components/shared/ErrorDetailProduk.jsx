import React from "react";

export default function ErrorDetailProduk({ code, message }) {
	return (
		<main className="bg-gray-200 lg:px-48 py-2 min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 text-black text-3xl">
			<span className="font-bold">Error status : {code}</span>
			<span className="hidden md:block"> | </span>
			<span className="font-bold">{message} </span>
		</main>
	);
}
