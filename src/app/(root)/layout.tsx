import '../globals.css'

import { siteConfig } from 'config/site'
import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import TopLoadingBar from 'nextjs-toploader'
import Providers from 'providers'

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.title,
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
	maximumScale: 1,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<html lang='en' suppressHydrationWarning>
				<body className='min-h-screen antialiased bg-background'>
					<TopLoadingBar
						color='rgb(79 70 229)'
						showSpinner={false}
						height={3}
					/>
					<Providers>{children}</Providers>
					<Analytics />
					<SpeedInsights />
				</body>
			</html>
		</>
	)
}
