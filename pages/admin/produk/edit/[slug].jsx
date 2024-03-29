import ProductForm from "@/components/admin/ProductForm";
import { useRouter } from "next/router";

export default function Index({ slug }) {
	return <ProductForm slug={slug} />;
}

export function getServerSideProps(context) {
	const { slug } = context.query;
	return {
		props: {
			slug,
		},
	};
}
