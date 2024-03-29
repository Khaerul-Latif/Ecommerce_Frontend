import GambarProdukForm from "@/components/admin/GambarProdukForm";

export default function edit({ id }) {
	return <GambarProdukForm formType={"update"} id_gambar={id} />;
}

export function getServerSideProps(context) {
	const { id } = context.query;
	return {
		props: { id },
	};
}
