'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from 'ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from 'ui/card'
import ImageThumbnail from './image.thumbnail'

import { formatDate } from 'date-fns'
import type { Post } from 'lib/blog'

import { cn } from 'utils'

import { type LucideProps, CalendarIcon, ClockIcon } from 'lucide-react'

type TBlogPost = Post & { blurDataUrl: string | undefined }

interface BlogPostsProps {
	blogPosts: TBlogPost[]
}

const BlogPosts: React.FC<BlogPostsProps> = ({ blogPosts }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			{blogPosts.map(
				({
					slug,
					metadata: { title, image, summary, publishedAt },
					content,
					blurDataUrl,
				}) => {
					const formattedDate = formatDate(
						new Date(publishedAt),
						'MMM dd, yyyy'
					)
					const readingTime = Math.ceil(content.split(' ').length / 200)

					return (
						<div key={slug} className='w-full'>
							<Link href={`/blog/${slug}`} passHref>
								<Card className='md:h-full border-0 shadow-none hover:bg-accent rounded-3xl'>
									<CardHeader className='p-4 pb-0'>
										<ImageThumbnail
											key={slug}
											src={image || `/og?title=${title}`}
											alt={title}
											placeholder={image ? 'blur' : 'empty'}
											blurDataURL={image && blurDataUrl}
											aspectRatio={2 / 1.1}
										/>
									</CardHeader>

									<CardContent className='p-4 pb-2'>
										<CardTitle className='text-xl font-semibold line-clamp-2'>
											{title}
										</CardTitle>

										<BlogPostMeta
											formattedDate={formattedDate}
											readingTime={readingTime}
											slug={slug}
										/>
									</CardContent>
								</Card>
							</Link>
						</div>
					)
				}
			)}
		</div>
	)
}

export default BlogPosts

interface BlogPostMetaProps {
	formattedDate: string
	distance?: string
	readingTime: number
	slug: string
}

type MetaItem = {
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>
	text: string
}

export const BlogPostMeta: React.FC<BlogPostMetaProps> = React.memo(
	({ formattedDate, distance, readingTime, slug }) => {
		const metaItems: MetaItem[] = [
			{
				icon: CalendarIcon,
				text: distance ? `${formattedDate} (${distance})` : formattedDate,
			},
			{
				icon: ClockIcon,
				text: `${readingTime} min read`,
			},
		]

		return (
			<span className='text-xs text-muted-foreground'>
				{metaItems.map(item => item.text).join(' • ')}
			</span>
		)
	}
)

interface BlogPostBreadcrumbProps {
	title: string
	slug: string
}

type BreadcrumbItem = {
	name: string
	href: string
}

export const BlogPostBreadcrumb: React.FC<BlogPostBreadcrumbProps> = ({
	title,
	slug,
}) => {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '/blog' },
		{ name: title, href: `/blog/${slug}` },
	]

	return (
		<Breadcrumb className='mb-8'>
			<BreadcrumbList>
				{breadcrumbItems.map((item, index) => (
					<React.Fragment key={item.href}>
						{index > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href={item.href}>{item.name}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

type Heading = {
	id: string
	text: string
	level: number
	top: number
}

export const BlogPostContentNavigation = () => {
	const [headings, setHeadings] = useState<Heading[]>([])
	const [activeId, setActiveId] = useState<string>('')

	const getHeadings = useCallback(() => {
		return Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(
			element => ({
				id: element.id,
				text: element.textContent || '',
				level: parseInt(element.tagName[1]),
				top: element.getBoundingClientRect().top + window.scrollY,
			})
		)
	}, [])

	useEffect(() => {
		const updateHeadings = () => {
			setHeadings(getHeadings())
		}

		updateHeadings()
		window.addEventListener('resize', updateHeadings)
		return () => window.removeEventListener('resize', updateHeadings)
	}, [getHeadings])

	useEffect(() => {
		let rafId: number

		const handleScroll = () => {
			cancelAnimationFrame(rafId)
			rafId = requestAnimationFrame(() => {
				const scrollPosition = window.scrollY + 100 // Offset for better UX
				const currentHeading = headings.reduce(
					(prev, current) =>
						scrollPosition >= current.top && current.top > prev.top
							? current
							: prev,
					headings[0]
				)

				if (currentHeading && currentHeading.id !== activeId) {
					setActiveId(currentHeading.id)
				}
			})
		}

		handleScroll() // Call once to set initial active heading
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', handleScroll)
			cancelAnimationFrame(rafId)
		}
	}, [headings, activeId])

	const memoizedHeadings = useMemo(() => headings, [headings])

	if (memoizedHeadings.length === 0) {
		return null
	}

	return (
		<nav className='sticky top-20 min-w-72 max-h-[calc(100vh-6rem)] overflow-auto p-4 bg-background border rounded-lg shadow-sm'>
			<h4 className='text-sm font-semibold mb-2'>Table of Contents</h4>
			<ul className='space-y-2'>
				{memoizedHeadings.map(heading => (
					<HeadingLink
						key={heading.id}
						heading={heading}
						isActive={activeId === heading.id}
					/>
				))}
			</ul>
		</nav>
	)
}

const HeadingLink = React.memo(
	({ heading, isActive }: { heading: Heading; isActive: boolean }) => (
		<li style={{ marginLeft: `${(heading.level - 1) * 0.5}rem` }}>
			<Link
				href={`#${heading.id}`}
				className={cn(
					'text-sm transition-colors duration-200',
					isActive
						? 'text-primary font-medium'
						: 'text-muted-foreground hover:text-foreground'
				)}
			>
				{heading.text}
			</Link>
		</li>
	)
)

export const BlogPostContentNavigationSkeleton = () => {
	return (
		<nav className='sticky top-20 min-w-72 max-h-[calc(100vh-6rem)] overflow-auto p-4 bg-background border rounded-lg shadow-sm animate-pulse'>
			<div className='h-5 w-32 bg-gray-200 rounded mb-4'></div>
			<ul className='space-y-3'>
				{[...Array(5)].map((_, index) => (
					<li key={index} className='flex flex-col space-y-2'>
						<div className='h-4 bg-gray-200 rounded w-full'></div>
						<div className='h-4 bg-gray-200 rounded w-3/4'></div>
						{index % 2 === 0 && (
							<div className='h-4 bg-gray-200 rounded w-1/2 ml-4'></div>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}
