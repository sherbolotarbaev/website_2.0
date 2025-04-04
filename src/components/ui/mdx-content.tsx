import type React from 'react'

import type { MDXComponents } from 'mdx/types'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import Link from 'next/link'
import CopyButton from 'shared/ui/button/copy'
import ImageThumbnail from 'shared/ui/image.thumbnail'
import { Card } from 'ui/card'

const slugify = (str: string) => {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
}

const components: MDXComponents = {
	Image: ({ src, alt }) => (
		<ImageThumbnail src={src} alt={alt} aspectRatio={2 / 1} />
	),
	a: ({ children, href }) =>
		href ? (
			<Link
				className='font-semibold underline decoration-muted-foreground/50 hover:decoration-muted-foreground underline-offset-2'
				href={href}
				target='_blank'
			>
				{children}
			</Link>
		) : null,
	code: ({ className, ...props }) => (
		<code
			className='px-[0.3rem] py-[0.2rem] font-mono text-sm bg-muted rounded-md'
			{...props}
		/>
	),
	pre: ({ children }) => {
		const languageMatch = children.props.className?.match(/language-(\w+)/)
		const language = languageMatch ? languageMatch[1] : 'plain'
		const codeContent = (children.props.raw || '').trim()

		return (
			<Card className='relative p-4 my-6 shadow-none bg-zinc-900'>
				<CopyButton content={codeContent} />

				<SyntaxHighlighter
					language={language}
					style={codeTheme}
					showLineNumbers={language !== 'bash'}
					wrapLines={true}
					customStyle={{
						margin: 0,
						padding: 0,
						fontSize: '14px',
						backgroundColor: 'transparent',
					}}
					lineNumberStyle={
						language !== 'bash'
							? {
									minWidth: '2.2em',
									paddingRight: '1.2em',
									userSelect: 'none',
									textAlign: 'right',
							  }
							: undefined
					}
				>
					{codeContent}
				</SyntaxHighlighter>
			</Card>
		)
	},
	video: () => <video controls className='w-full rounded-lg shadow-md'></video>,
	h1: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h1
					id={slug}
					className='scroll-m-5 text-3xl font-extrabold tracking-tight mt-12 mb-4'
				>
					{children}
				</h1>
			</Link>
		)
	},
	h2: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h2
					id={slug}
					className='scroll-m-5 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4 leading-10'
				>
					{children}
				</h2>
			</Link>
		)
	},
	h3: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h3
					id={slug}
					className='scroll-m-5 text-xl font-semibold tracking-tight leading-8'
				>
					{children}
				</h3>
			</Link>
		)
	},
	h4: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h4
					id={slug}
					className='scroll-m-5 text-lg font-semibold tracking-tight'
				>
					{children}
				</h4>
			</Link>
		)
	},
	p: ({ children }) => (
		<p className='leading-7 [&:not(:first-child)]:mt-6 mb-4'>{children}</p>
	),
	ul: ({ children }) => (
		<ul className='my-6 ml-6 list-disc [&>li]:mt-2'>{children}</ul>
	),
	ol: ({ children }) => (
		<ol className='my-6 ml-6 list-decimal [&>li]:mt-2'>{children}</ol>
	),
	li: ({ children }) => <li className='leading-7'>{children}</li>,
	blockquote: ({ children }) => (
		<blockquote className='mt-6 border-l-2 border-l-muted-foreground text-muted-foreground pl-6 italic'>
			{children}
		</blockquote>
	),
	table: ({ children }) => (
		<div className='my-6 w-full overflow-y-auto'>
			<table className='w-full'>{children}</table>
		</div>
	),
	tr: ({ children }) => (
		<tr className='m-0 border-t p-0 even:bg-muted'>{children}</tr>
	),
	th: ({ children }) => (
		<th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
			{children}
		</th>
	),
	td: ({ children }) => (
		<td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
			{children}
		</td>
	),
}

const rawCodePlugin = () => (tree: any) => {
	visit(tree, 'element', node => {
		if (node.tagName === 'pre') {
			const [codeEl] = node.children
			if (codeEl.tagName === 'code') {
				node.raw = codeEl.children?.[0]?.value
			}
		}
	})

	visit(tree, 'element', node => {
		if (node.tagName === 'pre') {
			for (const child of node.children) {
				if (child.tagName === 'code') {
					child.properties['raw'] = node.raw
				}
			}
		}
	})
}

type MDXContentProps = Omit<MDXRemoteProps, 'components'>

const MDXContent: React.FC<MDXContentProps> = props => {
	return (
		// @ts-ignore
		<MDXRemote
			{...props}
			components={components}
			options={{
				parseFrontmatter: true,
				mdxOptions: {
					rehypePlugins: [
						[rawCodePlugin],
						[rehypePrism, { ignoreMissing: true }],
					],
					remarkPlugins: [remarkGfm],
				},
			}}
		/>
	)
}

export default MDXContent
