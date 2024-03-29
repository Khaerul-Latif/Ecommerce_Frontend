import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/stores/Context";
import Image from "next/image";

export default function Index() {
	const { cart, setCart } = useContext(DataContext);
	const data = cart;
	const reduction = (id) => {
		const data = cart.cart;
		data.forEach((item) => {
			if (item.id === id) {
				item.count === 1 ? (item.count = 1) : (item.count -= 1);
			}
		});
		setCart({ cart: data });
		getTotal();
	};

	const increase = (id) => {
		const data = cart.cart;
		data.forEach((item) => {
			if (item.id === id) {
				item.count += 1;
			}
		});
		setCart({ cart: data });
		getTotal();
	};

	const getTotal = () => {
		const data = cart.cart;
		let totalCheck = compareArrays(cart.cart, selectedItems);
		const res = totalCheck.reduce((prev, item) => {
			return prev + item.price * item.count;
		}, 0);
		setCart({ cart: data, total: res });
	};
	const [selectedItems, setSelectedItems] = useState([]);
	const checkboxHandler = (e) => {
		let isSelected = e.target.checked;
		let value = e.target.value;

		if (isSelected) {
			setSelectedItems([...selectedItems, value]);
		} else {
			setSelectedItems((prevData) => {
				return prevData.filter((id) => {
					return id !== value;
				});
			});
		}
	};

	const checkAllHandler = () => {
		if (cart.cart.length === selectedItems.length) {
			setSelectedItems([]);
		} else {
			const postIds = cart.cart.map((item) => {
				return item.id;
			});

			setSelectedItems(postIds);
		}
	};

	function compareArrays(array1, array2) {
		const objectMap = {};

		// Mengisi objekMap dengan objek berdasarkan id
		array1.forEach((obj) => {
			objectMap[obj.id] = obj;
		});

		// Memfilter objek yang memiliki id yang terdapat dalam idArray
		const resultArray = array2.map((id) => objectMap[id]).filter(Boolean);

		return resultArray;
	}

	useEffect(() => {
		getTotal();
	}, [selectedItems]);
	return (
		<>
			<div className="text-sm md:text-xl font-semibold mx-0 md:mx-5 mt-5 bg-gray-200">
				<input
					type="checkbox"
					className="form-checkbox text-indigo-600 h-4 w-4 m-5"
					onChange={checkAllHandler}
				/>
				Pilih Semua
			</div>
			{cart?.cart?.map((product, index) => {
				return (
					<div
						key={index}
						className="w-75 flex flex-col text-sm font-semibold mx-0 md:mx-5 mt-5 py-5 bg-gray-200">
						<div className="flex flex-rowl">
							<input
								type="checkbox"
								className="form-checkbox text-indigo-600 h-4 w-4 m-5"
								value={product.id}
								onChange={checkboxHandler}
								checked={selectedItems.includes(product.id)}
							/>

							<Image
								src="https://placehold.co/150x150"
								alt=""
								width={125}
								height={125}
							/>
							<div className="flex flex-row justify-between w-full mx-5">
								<div className="grid grid-rows-2 pr-5 font-light text-sm">
									<div>{product.title.split(" ").slice(0, 10).join(" ")}</div>
									<div>{product.id}</div>
								</div>
								<div className="flex flex-col justify-between items-center">
									<div>Rp. {product.price}</div>
									<div>
										<div className="flex justify-center items-center">
											<button
												className="bg-gray-200 hover:bg-gray-300 text-green-800 text-xl font-bold py-2 md:px-4 px-2 rounded-l focus:outline-none"
												onClick={() => reduction(product.id)}>
												-
											</button>
											<input
												type="text"
												className="w-10 text-center bg-gray-100 text-gray-700 font-bold py-1 px-1 border border-gray-200"
												value={product.count}
												readOnly
											/>
											<button
												className="bg-gray-200 hover:bg-gray-300 text-green-800 font-bold py-2 md:px-4 px-2 rounded-r focus:outline-none"
												onClick={() => increase(product.id)}>
												+
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<h1>TOTAL RP. {cart.total}</h1>
			<h2>Selected Item {selectedItems.toString()}</h2>
		</>
	);
}
