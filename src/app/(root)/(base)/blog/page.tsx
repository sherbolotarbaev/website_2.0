import type { Metadata } from 'next'

import BlogPosts from 'shared/ui/blog-posts'
import IndigoDot from 'shared/ui/indigo-dot'

import { getBlogPosts } from 'lib/blog'
import { getBase64 } from 'lib/blur-data-url'

import { siteConfig } from 'config/site'
import { euclidSemiBold } from 'fonts'

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
				<h1
					className='text-2xl font-semibold tracking-tight'
					style={euclidSemiBold.style}
				>
					Personal blog
					<IndigoDot />
				</h1>

				<p className='leading-relaxed'>Thoughts, ideas, and experiences.</p>
			</div>

			<div className='container-fluid pb-8 bg-background rounded-b-[32px]'>
				<BlogPosts blogPosts={blogPosts} />
			</div>
		</>
	)
}
