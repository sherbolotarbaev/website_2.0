'use client'

import { motion, useInView } from 'framer-motion'
import type React from 'react'
import { Fragment, useRef } from 'react'

import Link from 'next/link'
import ImageThumbnail from 'shared/ui/image.thumbnail'
import IndigoDot from 'shared/ui/indigo-dot'
import { Badge } from 'ui/badge'
import { HoverPeek } from 'ui/link-preview'
import { Separator } from 'ui/separator'

import {
	experiences,
	formatExperiences,
	type TExperience,
} from './lib/experiences'

const Work: React.FC = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })

	return (
		<section ref={ref} className='space-y-3'>
			<motion.h1
				className='text-2xl font-semibold tracking-tight'
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
			>
				Experience
				<IndigoDot />
			</motion.h1>

			<div className='flex flex-col'>
				{formatExperiences(experiences).map((props, index) => (
					<Fragment key={index}>
						<Experience {...props} />
						{index < experiences.length - 1 && <Separator className='my-8' />}
					</Fragment>
				))}
			</div>
		</section>
	)
}

export default Work

const Experience: React.FC<TExperience> = ({
	company,
	duration,
	location,
	url,
	positions,
}) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	return (
		<motion.div
			ref={ref}
			className='flex-1'
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<div className='mb-3'>
				<HoverPeek url={url}>
					<Link
						href={url}
						target='_blank'
						className='text-lg font-semibold tracking-tight mb-1 underline decoration-muted-foreground/50 hover:decoration-muted-foreground underline-offset-2'
					>
						{company}
					</Link>
				</HoverPeek>

				<div className='flex flex-col'>
					<span className='text-sm text-muted-foreground'>
						{duration.startDate} - {duration.endDate} · {duration.totalDuration}
					</span>
					<span className='text-sm text-muted-foreground'>{location}</span>
				</div>
			</div>

			<div className='flex flex-col gap-6 relative'>
				{positions.map(
					({ title, description, period, covers, skills }, posIndex) => (
						<motion.div
							key={posIndex}
							className='relative pl-6'
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
							transition={{ duration: 0.5, delay: posIndex * 0.1 }}
						>
							<motion.div
								className='absolute left-0 top-1.5 size-2 rounded-full bg-muted-foreground'
								initial={{ scale: 0 }}
								animate={isInView ? { scale: 1 } : { scale: 0 }}
								transition={{ duration: 0.3, delay: posIndex * 0.1 }}
							/>
							{posIndex !== positions.length - 1 && (
								<motion.div
									className='absolute left-[3px] top-4 bottom-[-24px] w-[1px] bg-border'
									initial={{ scaleY: 0 }}
									animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
									transition={{ duration: 0.5, delay: posIndex * 0.1 }}
									style={{ originY: 0 }}
								/>
							)}

							<div className='leading-relaxed mb-1'>
								<h3 className='tracking-tight font-medium'>{title}</h3>

								<span className='text-sm text-muted-foreground'>
									{period.startDate} - {period.endDate} · {period.duration}
								</span>
							</div>

							{description && (
								<p
									className='leading-relaxed'
									dangerouslySetInnerHTML={{
										__html: description,
									}}
								/>
							)}

							{covers && covers.length > 0 && (
								<motion.div
									className='mt-4 flex flex-wrap gap-3'
									initial={{ opacity: 0, y: 20 }}
									animate={
										isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.5, delay: posIndex * 0.1 + 0.2 }}
								>
									{covers.map((cover, coverIndex) => (
										<ImageThumbnail
											key={coverIndex}
											src={cover || '/placeholder.svg'}
											alt={`${title} - ${company} (cover ${coverIndex + 1})`}
											aspectRatio={2 / 1.1}
											className='md:max-w-72 shadow-lg'
										/>
									))}
								</motion.div>
							)}

							{skills && skills.length > 0 && (
								<motion.div
									className='flex flex-wrap gap-2 mt-4'
									initial={{ opacity: 0, y: 10 }}
									animate={
										isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
									}
									transition={{ duration: 0.5, delay: posIndex * 0.1 + 0.3 }}
								>
									{skills.map((skill, skillIndex) => (
										<Badge key={skillIndex} variant='secondary'>
											{skill}
										</Badge>
									))}
								</motion.div>
							)}
						</motion.div>
					)
				)}
			</div>
		</motion.div>
	)
}
