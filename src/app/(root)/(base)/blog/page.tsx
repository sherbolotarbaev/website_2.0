import { getBlogPosts } from 'lib/blog'

import BlogPosts from 'shared/ui/blog-posts'

import { euclidSemiBold } from 'fonts'
import { getBase64 } from 'lib/blur-data-url'

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
			<div className='container space-y-6'>
				<div className='space-y-3'>
					<h1
						className='text-2xl font-semibold tracking-tight'
						style={euclidSemiBold.style}
					>
						Personal blog<span className='text-[#6A61FF]'>.</span>
					</h1>

					<p className='leading-relaxed'>Thoughts, ideas, and experiences.</p>
				</div>

				<BlogPosts blogPosts={blogPosts} />
			</div>
		</>
	)
}
