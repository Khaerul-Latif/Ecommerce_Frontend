import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/auth";
import toast from "react-hot-toast";
import { host } from "@/utils/constant";

export default function AuthCard({ setAuth }) {
	const { login } = useAuthStore();
	const route = useRouter();
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [isVisible, setIsVisible] = useState(false);
	const handlePasswordVisibility = (event) => {
		event.preventDefault();
		setIsVisible(!isVisible);
	};
	const [error, setError] = useState(null);

	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(
				`${host}/login`,
				{
					email: data.email,
					password: data.password,
				}
			);
			const email = data.email;
			const token = response.data.token;
			const role = response.data.role;
			login({ email, role, token });
			toast.success("Login Berhasil");
			setAuth(false);
			setLoading(false);
		} catch (error) {
			setError("Email atau Password salah");
			setLoading(false);
		}
	};

	const handleClose = () => {
		setAuth(false);
	};

	return (
		<div className="flex w-full justify-center items-center fixed min-h-screen z-50">
			<div className="bg-white relative text-black flex flex-col gap-8 px-24 py-12 rounded-xl shadow-2xl max-w-screen-sm">
				<button
					onClick={handleClose}
					className="absolute right-0 top-0 mt-4 mr-4 hover:bg-gray-50 px-2 py-2 rounded-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.5em"
						height="1.5em"
						viewBox="0 0 14 14">
						<path
							fill="black"
							fillRule="evenodd"
							d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
							clipRule="evenodd"></path>
					</svg>
				</button>
				<h1 className="font-bold text-3xl">LOGIN</h1>
				{error && <div className="text-red-500 text-lg">{error}</div>}
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<label htmlFor="email" className="">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={data.email}
							onChange={(e) => setData({ ...data, email: e.target.value })}
							className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-primary-shades-100 transition-all duration-300 ease-in-out h-11"
							placeholder="Your email"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="password">Password</label>
						<div className="relative flex items-center ">
							<input
								type={isVisible ? "text" : "password"}
								id="password"
								name="password"
								value={data.password}
								onChange={(e) => setData({ ...data, password: e.target.value })}
								className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-primary-shades-100 transition-all duration-300 ease-in-out w-full h-11"
								placeholder="Your password"
								required
							/>
							<div className="absolute right-4">
								<button onClick={handlePasswordVisibility}>
									{isVisible ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="2em"
											height="2em"
											viewBox="-2 -2 24 24">
											<path
												fill="black"
												d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414l-7.208 7.21a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6c.914.003 1.827.094 2.709.262"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24">
											<path
												fill="black"
												d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>
					<button
						disabled={loading}
						type="submit"
						className="bg-black max-w-36 text-white py-4 justify-center rounded-lg ">
						LOGIN
					</button>
				</form>
				<div className="flex gap-2">
					<span className="text-gray-400">NEW USER?</span>
					<Link href={"/register"} className="text-black">
						REGISTER
					</Link>
				</div>
			</div>
		</div>
	);
}
