import { siteConfig } from 'config/site'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { formatDate, formatDistanceToNow } from 'date-fns'
import { getBlogPosts } from 'lib/blog'
import { getBase64 } from 'lib/blur-data-url'

import Script from 'next/script'
import { BlogPostBreadcrumb } from 'shared/ui/blog-posts'
import ShareButton from 'shared/ui/button/share'
import ImageThumbnail from 'shared/ui/image.thumbnail'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/avatar'
import MDXContent from 'ui/mdx-content'

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

	const formattedDate = formatDate(new Date(publishedAt), 'MMM dd, yyyy')
	const distance = formatDistanceToNow(new Date(publishedAt), {
		addSuffix: true,
	})
	const readingTime = Math.ceil(content.split(' ').length / 200)
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

				<article>
					<header className='mb-8 flex flex-col gap-5'>
						<h1 className='text-2xl sm:3xl md:text-4xl font-bold'>{title}</h1>

						<div className='flex justify-between items-center mb-4'>
							<AuthorInfo author={author}>
								{formattedDate} ({distance})
							</AuthorInfo>

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
		</>
	)
}

interface AuthorInfoProps {
	author: string
	children: React.ReactNode
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, children }) => {
	return (
		<div className='flex items-center gap-2'>
			<Avatar className='size-8'>
				<AvatarImage src='/images/sher.png' alt={author} loading='lazy' />
				<AvatarFallback>{author[0]}</AvatarFallback>
			</Avatar>

			<div>
				<h2 className='text-md font-medium tracking-tight'>{author}</h2>
				<p className='text-sm text-muted-foreground'>{children}</p>
			</div>
		</div>
	)
}
