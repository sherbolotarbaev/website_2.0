import type { Metadata } from 'next'

import BlogPosts from 'shared/ui/blog-posts'
import Dot from 'shared/ui/dot'
import BlurText from 'ui/animated-blur-text'

import { getBlogPosts } from 'lib/blog'
import { getBase64 } from 'lib/blur-data-url'

import { siteConfig } from 'config/site'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Thoughts, ideas, and experiences.',
	openGraph: {
		title: `Blog | ${siteConfig.title}`,
		description: 'Thoughts, ideas, and experiences.',
		url: `${siteConfig.url}/blog`,
		siteName: siteConfig.title,
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: `${siteConfig.url}/og?title=Personal Blog`,
			},
		],
	},
}

export default async function Blog() {
	const blogPosts = await Promise.all(
		getBlogPosts().map(async blogPost => ({
			...blogPost,
			blurDataUrl:
				blogPost.metadata.image && (await getBase64(blogPost.metadata.image)),
		}))
	)

	return (
		<>
			<div className='container pt-8 pb-6 bg-background rounded-t-[32px] space-y-3'>
				<h1 className='flex items-center gap-1 text-xl sm:text-2xl font-semibold tracking-tight'>
					<BlurText
						text='Personal blog'
						delay={150}
						animateBy='words'
						direction='top'
					/>
					<Dot />
				</h1>

				<p className='leading-relaxed'>Thoughts, ideas, and experiences.</p>
			</div>

			<div className='container-fluid pb-8 bg-background rounded-b-[32px]'>
				<BlogPosts blogPosts={blogPosts} />
			</div>
		</>
	)
}
