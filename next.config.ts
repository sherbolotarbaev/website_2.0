import type { NextConfig } from 'next'

const imageDomains: string[] = []

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ['next-mdx-remote'],
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: imageDomains.map(hostname => ({ hostname })),
	},
	env: {
		TELEGRAM_BOT_API_KEY: process.env.TELEGRAM_BOT_API_KEY,
		TELEGRAM_BOT_CHAT_ID: process.env.TELEGRAM_BOT_CHAT_ID,
	},
}

export default nextConfig
