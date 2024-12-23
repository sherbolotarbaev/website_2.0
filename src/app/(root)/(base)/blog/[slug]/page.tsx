import { siteConfig } from 'config/site'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { formatDate, formatDistanceToNow } from 'date-fns'
import { getBlogPosts } from 'lib/blog'
import { getBase64 } from 'lib/blur-data-url'
import { addView, getViews } from 'lib/db'

import { CalendarIcon, ClockIcon } from 'lucide-react'
import Script from 'next/script'
import { BlogPostBreadcrumb } from 'shared/ui/blog-posts'
import ShareButton from 'shared/ui/button/share'
import ImageThumbnail from 'shared/ui/image.thumbnail'
import MDXContent from 'ui/mdx-content'

async function getViewsCount(allViews: PostView[], slug: string) {
	const fetchedViews = await addView(slug)
	const viewsForPost = allViews.find(view => view.slug === slug)
	const count = fetchedViews ?? viewsForPost?.viewsCount ?? 0
	return count.toLocaleString()
}

interface GenerateMetadataProps {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({
	params,
}: Readonly<GenerateMetadataProps>): Promise<Metadata | undefined> {
	const slug = (await params).slug
	const post = getBlogPosts().find(post => post.slug === slug)

	if (!post) {
		return
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata

	const ogImage = image
		? `${siteConfig.url}${image}`
		: `${siteConfig.url}/og?title=${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `${siteConfig.url}/blog/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
	}
}

interface BlogPostProps {
	params: Promise<{
		slug: string
	}>
}

export default async function BlogPost({ params }: Readonly<BlogPostProps>) {
	const slug = (await params).slug
	const post = getBlogPosts().find(post => post.slug === slug)

	if (!post) {
		return notFound()
	}

	const {
		metadata: { title, summary, author, publishedAt, image },
		content,
	} = post

	const allViews = await getViews()

	const formattedDate = formatDate(new Date(publishedAt), 'MMM dd, yyyy')
	const distance = formatDistanceToNow(new Date(publishedAt), {
		addSuffix: true,
	})
	const readingTime = Math.ceil(content.split(' ').length / 200)
	// const isMobile = await isMobileDevice()
	const blurDataURL = image && (await getBase64(image))

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		datePublished: publishedAt,
		dateModified: publishedAt,
		description: summary,
		image: image
			? `${siteConfig.url}${image}`
			: `${siteConfig.url}/og?title=${title}`,
		url: `${siteConfig.url}/blog/${slug}`,
		author: {
			'@type': 'Person',
			name: author,
		},
		timeRequired: `PT${readingTime}M`,
	}

	const views = await getViewsCount(allViews, slug)

	return (
		<>
			<div className='container'>
				<Script
					id='blog-post-schema'
					type='application/ld+json'
					strategy='beforeInteractive'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<BlogPostBreadcrumb title={title} slug={slug} />

				<div className='w-full flex flex-col lg:flex-row lg:gap-6'>
					<article className='max-w-[34.5rem]'>
						<header className='mb-8 flex flex-col gap-4'>
							<h1 className='text-3xl font-bold'>{title}</h1>

							<div className='flex justify-between md:items-center'>
								<div className='flex flex-col gap-2 md:flex-row text-sm text-muted-foreground'>
									<div className='flex items-center gap-2'>
										<CalendarIcon className='size-4' />
										<span>
											{formattedDate} ({distance})
										</span>
									</div>

									<div className='flex items-center gap-2'>
										<span className='flex items-center gap-1'>
											<ClockIcon className='size-4' />
											{readingTime} min read
										</span>

										<span aria-hidden='true'>•</span>

										<span className='flex items-center gap-1'>
											<ClockIcon className='size-4' />
											{views} views
										</span>
									</div>
								</div>

								<ShareButton />
							</div>

							{image && (
								<ImageThumbnail
									key={slug}
									src={image}
									alt={title}
									placeholder='blur'
									blurDataURL={blurDataURL}
									aspectRatio={2 / 1}
								/>
							)}

							<p>{summary}</p>
						</header>

						<div className='prose lg:prose-xl'>
							<MDXContent source={content} />
						</div>
					</article>
				</div>
			</div>
		</>
	)
}
