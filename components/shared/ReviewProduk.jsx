import ReviewCard from "./ReviewCard";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ReviewProduk({ data }) {
	return (
		<div className="flex flex-col px-8 pb-16 bg-white rounded-xl max-w-2xl">
			<h1 className="text-lg text-black font-bold">ULASAN PEMBELI</h1>
			<div className="flex flex-col mt-2 gap-4 px-4">
				{data.length == 0 ? (
					<p className="text-black">Belum ada ulasan</p>
				) : (
					data.map((item, index) => (
						<ReviewCard
							key={index}
							comment={item.comment}
							bintang={item.bintang}
							user={item.user}
						/>
					))
				)}
			</div>
		</div>
	);
}
