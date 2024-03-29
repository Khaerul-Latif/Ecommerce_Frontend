import React from "react";

export default function PaginationProduk({
	page,
	size,
	total,
	handleSize,
	handleNextPage,
	handlePrevPage,
}) {
	const maxPage = Math.ceil(total / size);
	return (
		<div className="flex justify-between">
			<div className="showing">
				<span className="text-black">Showing </span>
				<span className="text-black font-bold">
					{total !== 0 ? (page - 1) * size + 1 : 0}
				</span>
				<span className="text-black"> to </span>
				<span className="text-black font-bold">
					{total <= size ? total : page * size}
				</span>
				<span className="text-black"> of </span>
				<span className="text-black font-bold">{total}</span>
				<span className="text-black"> Data</span>
			</div>
			<div className="flex gap-4">
				<div className="flex gap-4 justify-center items-center">
					<span>Maksimal</span>
					<select
						className="select select-bordered bg-white"
						value={size}
						onChange={handleSize}>
						<option value={1}>1</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={20}>20</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
					</select>
					<span>Data</span>
				</div>
				<div className="join">
					<button
						onClick={handlePrevPage}
						className="join-item btn bg-slate-100 text-black font-bold hover:bg-slate-300 disabled:border-black disabled:text-gray-300 disabled:cursor-not-allowed"
						disabled={page == 1}>
						«
					</button>
					<button className="join-item btn bg-slate-100 text-black font-bold hover:bg-slate-300">
						Page {page ? page : 1}
					</button>
					<button
						onClick={handleNextPage}
						className="join-item btn bg-slate-100 text-black font-bold hover:bg-slate-300 disabled:border-black disabled:text-gray-300 disabled:cursor-not-allowed"
						disabled={maxPage == page || total == 0}>
						»
					</button>
				</div>
			</div>
		</div>
	);
}
