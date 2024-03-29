import VariantForm from "@/components/admin/VariantForm";
import React from "react";

export default function crate({ id }) {
	return <VariantForm id_product={id} formType={"create"} />;
}

export function getServerSideProps(context) {
	const { id } = context.query;
	return {
		props: {
			id,
		}, // will be passed to the page component as props
	};
}
