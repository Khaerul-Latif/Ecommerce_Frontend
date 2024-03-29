/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["placehold.co", "d1yutv2xslo29o.cloudfront.net"],
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.tokopedia.net",
			},
			{
				protocol: "https",
				hostname: "d1yutv2xslo29o.cloudfront.net",
			},

			{
				protocol: "https",
				hostname: "placehold.co",
			},

			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
};

export default nextConfig;
