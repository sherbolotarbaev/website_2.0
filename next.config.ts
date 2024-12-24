import type { NextConfig } from 'next'

const imageDomains: string[] = ['wallpapercave.com']

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ['next-mdx-remote'],
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: imageDomains.map(hostname => ({ hostname })),
	},
}

export default nextConfig
