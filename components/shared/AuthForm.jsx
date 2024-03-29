import Link from "next/link";
import { useContext, useState } from "react";
import axios from "axios";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/router";
import { DataContext } from "@/stores/Context";
import toast, { Toaster } from "react-hot-toast";
import { host } from "@/utils/constant";

export default function AuthForm({ form }) {
	const route = useRouter();
	const { login } = useAuthStore();
	const [isVisible, setIsVisible] = useState(false);
	const handlePasswordVisibility = (event) => {
		event.preventDefault();
		setIsVisible(!isVisible);
	};

	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// destructure cart context
	const { cart, setCart, setAndStoreData } = useContext(DataContext)

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (form === "register") {
			if (data.password !== data.confirmPassword) {
				setError("Password dan Confirm Password tidak sama");
				setLoading(false);
				return;
			}
		}

		if (form == "register") {
			try {
				const response = await axios.post(
					`${host}/register`,
					{
						name: data.name,
						email: data.email,
						password: data.password,
					}
				);
				toast.success("Register Success");
				route.push("/login");
			} catch (error) {
				setError(error.response.data.message);
			} finally {
				setLoading(false);
			}
		} else {
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
				login({ email, token });

				// set isi keranjang
				const resKeranjang = await axios.get(
					`${host}/keranjang`,
					{headers: {Authorization: `Bearer ${token}`}}
				);

				// set resKeranjang ke dalam state context keranjang
				const keranjang = resKeranjang.data.data
				await setAndStoreData(keranjang)
				const role = response.data.role;
				login({ email, role, token });
				toast.success("Login Success");        
				route.push("/");
        		window.location.reload()
			} catch (error) {
				toast.error("Email atau Password salah");
				setError("Email atau Password salah");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="flex flex-col gap-4 text-black py-8 lg:w-96 ">
			<Toaster position="top-center" />
			<h1 className="font-bold text-3xl">
				{form == "register" ? "REGISTER" : "Welcome Back"}
			</h1>
			<span className="text-gray-400 text-sm ">
				{form == "register" ? "JOIN TO US" : "LOGIN TO CONTINUE"}
			</span>
			{error && <div className="text-red-500 text-lg">{error}</div>}
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				{form === "register" ? (
					<div className="flex flex-col gap-3">
						<label htmlFor="name" className="">
							Name
						</label>
						<input
							type="name"
							id="name"
							name="name"
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
							className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-primary-shades-100 transition-all duration-300 ease-in-out h-11"
							placeholder="Your Name"
							required
						/>
					</div>
				) : null}

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
										width="1em"
										height="1em"
										viewBox="0 0 24 24">
										<path
											fill="black"
											d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										viewBox="-2 -2 24 24">
										<path
											fill="black"
											d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414l-7.208 7.21a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6c.914.003 1.827.094 2.709.262"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				{form === "register" ? (
					<div className="flex flex-col gap-2">
						<label htmlFor="confirm-password">Confirm Password</label>
						<div className="relative flex items-center">
							<input
								type={isVisible ? "text" : "password"}
								id="confirm-password"
								name="confirm-password"
								value={data.confirmPassword}
								onChange={(e) =>
									setData({ ...data, confirmPassword: e.target.value })
								}
								className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-primary-shades-100 transition-all duration-300 ease-in-out w-full h-11"
								placeholder="Confirm Your password"
								required
							/>
							<div className="absolute right-4">
								<button onClick={handlePasswordVisibility}>
									{isVisible ? (
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
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="-2 -2 24 24">
											<path
												fill="black"
												d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414l-7.208 7.21a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6c.914.003 1.827.094 2.709.262"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>
				) : null}

				<button
					disabled={loading}
					type="submit"
					className="bg-black max-w-36 text-white py-4 justify-center rounded-lg ">
					{form == "register" ? "REGISTER" : "LOGIN"}
				</button>
			</form>

			<div className="flex gap-2">
				<span className="text-gray-400">
					{form == "register" ? "ALREADY USER?" : "NEW USER?"}
				</span>
				<Link
					href={form == "register" ? "/login" : "/register"}
					className="text-black">
					{form == "register" ? "LOGIN" : "REGISTER"}
				</Link>
			</div>
		</div>
	);
}
