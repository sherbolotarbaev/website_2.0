'use client'

import { motion, useInView } from 'framer-motion'
import type React from 'react'
import { useRef } from 'react'

import Link from 'next/link'
import Dot from 'shared/ui/dot'
import ImageThumbnail from 'shared/ui/image.thumbnail'
import BlurText from 'ui/animated-blur-text'
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
import { GlowingEffect } from 'ui/glowing-effect'
import { HoverPeek } from 'ui/link-preview'

import { cn } from 'utils'
import { projects, type TProject } from './lib/projects'

import { ExternalLink, Github } from 'lucide-react'

const Projects: React.FC = () => {
	return (
		<section className='space-y-8'>
			<h2 className='flex items-center gap-1 text-xl sm:text-2xl font-semibold tracking-tight'>
				<BlurText
					text='Projects'
					delay={150}
					animateBy='words'
					direction='top'
				/>
				<Dot />
			</h2>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				{projects.map((project, index) => (
					<ProjectCard key={index} {...project} index={index} />
				))}
			</div>
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
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className='relative rounded-3xl'
		>
			<GlowingEffect
				spread={40}
				glow={true}
				disabled={false}
				proximity={64}
				inactiveZone={0.01}
				borderWidth={1.5}
			/>
			<Card className='rounded-3xl overflow-hidden shadow-none bg-accent/40 flex flex-col group h-full'>
				<CardHeader className='p-0 border-b'>
					<div className='relative'>
						<ImageThumbnail
							src={image || '/placeholder.svg'}
							alt={title}
							className='rounded-t-3xl rounded-none border-0'
							aspectRatio={2 / 1}
						/>
						<div className='p-4 absolute inset-0 md:bg-black/60 flex md:items-center md:justify-center md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300 rounded-t-3xl rounded-b-none'>
							<div className='flex gap-2'>
								{repo && (
									<ProjectButton href={repo} ariaLabel='View repository'>
										<Github className='w-4 h-4' />
										Repo
									</ProjectButton>
								)}
								{demo && (
									<ProjectButton href={demo} ariaLabel='View live demo'>
										<ExternalLink className='w-4 h-4' />
										Demo
									</ProjectButton>
								)}
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent className='p-6 bg-background pb-0 rounded-b-3xl shadow-sm'>
					<CardTitle className='text-lg font-semibold mb-2'>{title}</CardTitle>
					<CardDescription className='text-sm text-muted-foreground mb-4'>
						{description}
					</CardDescription>
				</CardContent>
				<CardFooter className='py-2.5 px-4'>
					<div className='flex flex-wrap gap-1.5'>
						{technologies.map((tech, techIndex) => (
							<Badge
								key={techIndex}
								variant='outline'
								className='px-1.5 py-0.5 bg-background dark:bg-accent shadow-sm text-xs'
							>
								{tech}
							</Badge>
						))}
					</div>
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
			variant='secondary'
			size='sm'
			className={cn(
				'px-3 py-1 gap-2 rounded-full',
				'bg-white/10 hover:bg-white/20 text-white',
				'transition-colors duration-300'
			)}
			asChild
		>
			<HoverPeek url={href}>
				<Link
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					aria-label={ariaLabel}
				>
					{children}
				</Link>
			</HoverPeek>
		</Button>
	)
}
