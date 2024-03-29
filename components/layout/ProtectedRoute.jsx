import { useRouter } from "next/router";
import useAuthStore from "@/stores/auth";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
	let router = useRouter();
	const { user } = useAuthStore();
	useEffect(() => {
		
		if (user) {
			let loginRoutesList = ["/login", "/register"];
			if (loginRoutesList.includes(router.pathname)) {
				router.push("/");
			}
		}
		if (user?.role !== "admin") {
			let loginRoutesList = ["/admin"];
			if (loginRoutesList.includes(router.pathname)) {
				router.push("/");
			}
		}
	}, [user, router.pathname]);

	return <>{children}</>;
}
