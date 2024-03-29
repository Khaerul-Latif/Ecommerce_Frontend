import GambarProdukForm from "@/components/admin/GambarProdukForm";
import React from "react";

export default function create({ id }) {
	return <GambarProdukForm formType={"create"} id_product={id} />;
}

export function getServerSideProps(context) {
	const { id } = context.query;
	return {
		props: { id },
	};
}
