'use client'

import React, { useEffect, useRef } from 'react'

import { motion, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'
import ImageThumbnail from 'shared/ui/image.thumbnail'
import { Badge } from 'ui/badge'
import { Button } from 'ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from 'ui/card'

import { euclidSemiBold } from 'fonts'
import { projects, TProject } from './lib/projects'

import { ExternalLink, Github } from 'lucide-react'

const Projects: React.FC = () => {
	const controls = useAnimation()
	const ref = useRef(null)
	const inView = useInView(ref, { once: true })

	useEffect(() => {
		if (inView) {
			controls.start('visible')
		}
	}, [controls, inView])

	return (
		<section className='space-y-8' ref={ref}>
			<h1
				className='text-2xl font-semibold tracking-tight'
				style={euclidSemiBold.style}
			>
				Projects<span className='text-[#6A61FF]'>.</span>
			</h1>

			<motion.div
				className='grid grid-cols-1 md:grid-cols-2 gap-8'
				initial='hidden'
				animate={controls}
				variants={{
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
			>
				{projects.map((project, index) => (
					<ProjectCard key={index} {...project} index={index} />
				))}
			</motion.div>
		</section>
	)
}

export default Projects

const ProjectCard: React.FC<TProject & { index: number }> = ({
	image,
	title,
	description,
	technologies,
	repo,
	demo,
	index,
}) => {
	const controls = useAnimation()
	const ref = useRef(null)
	const inView = useInView(ref, { once: true })

	useEffect(() => {
		if (inView) {
			controls.start('visible')
		}
	}, [controls, inView])

	return (
		<motion.div
			ref={ref}
			initial='hidden'
			animate={controls}
			variants={{
				hidden: { opacity: 0, y: 50 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ duration: 0.5, delay: index * 0.2 }}
		>
			<Card className='rounded-3xl shadow-xl md:shadow hover:shadow-xl transition-shadow duration-300'>
				<CardHeader className='p-0'>
					<div className='relative'>
						<ImageThumbnail
							src={image || '/placeholder.svg'}
							alt={title}
							className='rounded-3xl'
							aspectRatio={2 / 1}
						/>

						<div className='p-4 absolute inset-0 bg-black bg-opacity-20 md:bg-opacity-50 flex items-start justify-start md:items-center md:justify-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-300 rounded-3xl'>
							<div className='flex gap-2'>
								{repo && (
									<ProjectButton href={repo} ariaLabel='View repository'>
										<Github className='w-5 h-5' /> Repo
									</ProjectButton>
								)}
								{demo && (
									<ProjectButton href={demo} ariaLabel='View live demo'>
										<ExternalLink className='w-5 h-5' /> Demo
									</ProjectButton>
								)}
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className='p-4'>
					<CardTitle
						className='text-xl leading-relaxed font-medium mb-2'
						style={euclidSemiBold.style}
					>
						{title}
					</CardTitle>

					<CardDescription>{description}</CardDescription>
				</CardContent>

				<CardFooter className='flex-wrap gap-2 p-4 pt-0'>
					{technologies.map((tech, techIndex) => (
						<Badge key={techIndex} variant='secondary'>
							{tech}
						</Badge>
					))}
				</CardFooter>
			</Card>
		</motion.div>
	)
}

interface ProjectButtonProps {
	href: string
	ariaLabel: string
	children: React.ReactNode
}

const ProjectButton: React.FC<ProjectButtonProps> = ({
	href,
	ariaLabel,
	children,
}) => {
	return (
		<Button
			variant='cool'
			size='sm'
			className='px-3 py-2 gap-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-300'
			asChild
		>
			<Link
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				aria-label={ariaLabel}
			>
				{children}
			</Link>
		</Button>
	)
}
