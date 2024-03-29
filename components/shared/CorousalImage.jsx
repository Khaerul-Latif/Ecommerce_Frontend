import React, { useState } from "react";

export default function CorousalImage({ gambar }) {
	const slides = gambar.map((gambar, index) => ({
		id: index,
		url: gambar.url,
	}));

	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};

	return (
		<div className="flex justify-center items-center gap-2 lg:self-start text-black">
			<button
				onClick={prevSlide}
				className="p-2 rounded-lg border-solid border-2 border-secondary-shades-30 text-black">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="17"
					viewBox="0 0 16 17"
					fill="black"
					className="lg:hidden  ">
					<g clipPath="url(#clip0_74_1318)">
						<path
							d="M11.0798 14.5066C10.7532 14.8333 10.2265 14.8333 9.89984 14.5066L4.35984 8.96664C4.09984 8.70664 4.09984 8.28664 4.35984 8.02664L9.89984 2.48664C10.2265 2.15997 10.7532 2.15997 11.0798 2.48664C11.4065 2.8133 11.4065 3.33997 11.0798 3.66664L6.25318 8.49997L11.0865 13.3333C11.4065 13.6533 11.4065 14.1866 11.0798 14.5066Z"
							fill="black"
						/>
					</g>
					<defs>
						<clipPath id="clip0_74_1318">
							<rect
								width="16"
								height="16"
								fill="white"
								transform="matrix(-1 0 0 1 16 0.5)"
							/>
						</clipPath>
					</defs>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="black"
					className="hidden lg:block">
					<g clipPath="url(#clip0_68_230)">
						<path
							d="M16.62 21.01C16.13 21.5 15.34 21.5 14.85 21.01L6.54001 12.7C6.15001 12.31 6.15001 11.68 6.54001 11.29L14.85 2.97999C15.34 2.48999 16.13 2.48999 16.62 2.97999C17.11 3.46999 17.11 4.25999 16.62 4.74999L9.38001 12L16.63 19.25C17.11 19.73 17.11 20.53 16.62 21.01Z"
							fill="black"
						/>
					</g>
					<defs>
						<clipPath id="clip0_68_230">
							<rect
								width="24"
								height="24"
								fill="white"
								transform="matrix(-1 0 0 1 24 0)"
							/>
						</clipPath>
					</defs>
				</svg>
			</button>

			<div className="m-auto py-16 relative z-10 group">
				<div
					style={{
						backgroundImage: `url(${slides[currentIndex].url})`,
					}}
					className=" h-96 md:h-[400px] z-10 w-72 md:w-[500px] lg:w-[400px] lg:h-[600px] rounded-2xl bg-center bg-no-repeat bg-contain md:bg-auto duration-500 md:mx-12"></div>

				<div className="flex top-4 justify-center py-2 gap-2 mt-6">
					{slides.map((slide, slideIndex) => (
						<div
							key={slideIndex}
							onClick={() => goToSlide(slideIndex)}
							className={`text-2xl cursor-pointer`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="9"
								height="8"
								viewBox="0 0 9 8"
								fill="none">
								<circle
									cx="4.5"
									cy="4"
									r="4"
									fill={`${
										slideIndex === currentIndex ? "#3D443D" : "#C8CBD0"
									}`}
								/>
							</svg>
						</div>
					))}
				</div>
			</div>
			<button
				onClick={nextSlide}
				className="p-2 rounded-lg border-solid border-2 border-secondary-shades-30">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="17"
					viewBox="0 0 16 17"
					fill="black"
					className="lg:hidden">
					<g clipPath="url(#clip0_74_1322)">
						<path
							d="M4.92016 14.5066C5.24682 14.8333 5.77349 14.8333 6.10016 14.5066L11.6402 8.96664C11.9002 8.70664 11.9002 8.28664 11.6402 8.02664L6.10016 2.48664C5.77349 2.15997 5.24682 2.15997 4.92016 2.48664C4.59349 2.8133 4.59349 3.33997 4.92016 3.66664L9.74682 8.49997L4.91349 13.3333C4.59349 13.6533 4.59349 14.1866 4.92016 14.5066Z"
							fill="black"
						/>
					</g>
					<defs>
						<clipPath id="clip0_74_1322">
							<rect
								width="16"
								height="16"
								fill="white"
								transform="translate(0 0.5)"
							/>
						</clipPath>
					</defs>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="black"
					className="hidden lg:block">
					<g clipPath="url(#clip0_68_225)">
						<path
							d="M7.37999 21.01C7.86999 21.5 8.65999 21.5 9.14999 21.01L17.46 12.7C17.85 12.31 17.85 11.68 17.46 11.29L9.14999 2.97999C8.65999 2.48999 7.86999 2.48999 7.37999 2.97999C6.88999 3.46999 6.88999 4.25999 7.37999 4.74999L14.62 12L7.36999 19.25C6.88999 19.73 6.88999 20.53 7.37999 21.01Z"
							fill="black"
						/>
					</g>
					<defs>
						<clipPath id="clip0_68_225">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</button>
		</div>
	);
}
