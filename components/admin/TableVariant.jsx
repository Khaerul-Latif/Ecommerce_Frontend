export default function TableVariant({ data, handleDelete, handleEdit }) {
	return (
		<div className="overflow-x-auto w-full">
			<table className="table">
				{/* head */}
				<thead>
					<tr className="text-black text-base">
						<th></th>
						<th>Warna</th>
						<th>Ukuran</th>
						<th>Stok</th>
						<th>harga</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((variant, index) => {
						let nomor = index + 1;
						return (
							<tr key={index} className="hover:bg-gray-200">
								<td>{nomor}</td>
								<td>{variant.warna}</td>
								<td>{variant.ukuran}</td>
								<td>{variant.stok}</td>
								<td>{variant.harga}</td>

								<td>
									<button
										onClick={() => {
											handleEdit(variant.id);
										}}
										className="btn btn-primary">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1.5em"
											height="1.5em"
											viewBox="0 0 24 24">
											<g
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}>
												<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
												<path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z"></path>
											</g>
										</svg>
									</button>
									<button
										onClick={() => {
											handleDelete(variant.id);
										}}
										className="btn btn-error mx-6">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1.5em"
											height="1.5em"
											viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"></path>
										</svg>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
