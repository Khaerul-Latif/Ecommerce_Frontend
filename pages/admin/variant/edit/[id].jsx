import VariantForm from "@/components/admin/VariantForm";
import React from "react";

export default function Index({ id }) {
	return <VariantForm id_variant={id} formType={"update"} />;
}

export function getServerSideProps(context) {
	const { id } = context.query;

	return {
		props: {
			id,
		},
	};
}
