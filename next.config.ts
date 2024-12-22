import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ['next-mdx-remote'],
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['s3-eu-west-1.amazonaws.com', 'media.licdn.com'],
	},
}

export default nextConfig
