'use client'

import Link from 'next/link'
import ImageThumbnail from 'shared/ui/image.thumbnail'
import { Badge } from 'ui/badge'
import { Button } from 'ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from 'ui/card'

import { euclidMedium, euclidSemiBold } from 'fonts'
import { projects, TProject } from './lib/projects'

import { ExternalLink, Github } from 'lucide-react'

const Projects: React.FC = () => {
	return (
		<section className='space-y-8'>
			<h1
				className='text-2xl font-semibold tracking-tight'
				style={euclidSemiBold.style}
			>
				Projects<span className='text-[#6A61FF]'>.</span>
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{projects.map((project, index) => (
					<ProjectCard key={index} {...project} />
				))}
			</div>
		</section>
	)
}

export default Projects

const ProjectCard: React.FC<TProject> = ({
	image,
	title,
	description,
	technologies,
	repo,
	demo,
}) => {
	return (
		<Card className='group space-y-2.5 border-0 shadow-none'>
			<div className='relative'>
				<ImageThumbnail src={image || '/placeholder.svg'} alt={title} />

				<div className='absolute top-2 right-2 flex gap-2 md:opacity-0 transition-opacity group-hover:opacity-100'>
					{repo && (
						<ProjectButton href={repo} ariaLabel='View repository'>
							<Github /> Repo
						</ProjectButton>
					)}

					{demo && (
						<ProjectButton href={demo} ariaLabel='View live demo'>
							<ExternalLink /> Demo
						</ProjectButton>
					)}
				</div>
			</div>

			<CardContent className='p-0'>
				<CardTitle
					className='leading-relaxed font-medium'
					style={euclidMedium.style}
				>
					{title}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardContent>

			<CardFooter className='p-0 flex-wrap gap-2'>
				{technologies.map((tech, techIndex) => (
					<Badge key={techIndex} variant='secondary'>
						{tech}
					</Badge>
				))}
			</CardFooter>
		</Card>
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
			className='px-1.5 gap-1 h-7 rounded-lg'
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
