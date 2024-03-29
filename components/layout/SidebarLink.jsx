import Link from "next/link";

export default function SidebarLink({ href, name }) {
	return (
		<Link className="hover:bg-gray-300 px-4 py-3 rounded-lg" href={href}>
			<span className="text-lg font-semibold">{name}</span>
		</Link>
	);
}
