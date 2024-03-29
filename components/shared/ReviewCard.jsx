import Image from "next/image";
import Star from "./Star";

export default function ReviewCard({ comment, bintang, user }) {
	return (
		<div className="flex flex-col gap-3 text-black pb-4 border-b-2">
			<Star rating={bintang} />

			<div className="flex gap-2 items-center">
				<Image
					src={
						user.url_profile ||
						"https://images.tokopedia.net/img/cache/100-square/tPxBYm/2023/1/20/5b686c7e-5ea9-4e31-8cb7-cc2bf713c875.jpg"
					}
					width={50}
					height={50}
					className="rounded-full"
				/>
				<span className="text-sm">{user.name}</span>
			</div>
			<span>{comment}</span>
		</div>
	);
}
