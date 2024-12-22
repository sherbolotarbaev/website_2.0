import React from 'react'

import Link from 'next/link'
import ImageWrapper from 'shared/ui/image.wrapper'
import { Badge } from 'ui/badge'
import { Separator } from 'ui/separator'

import {
	experiences,
	formatExperiences,
	type TExperience,
} from './lib/experiences'

import { euclidMedium, euclidSemiBold } from 'fonts'

const Work: React.FC = () => {
	return (
		<section className='space-y-3'>
			<h1
				className='text-2xl font-semibold tracking-tight'
				style={euclidSemiBold.style}
			>
				Experience<span className='text-[#6A61FF]'>.</span>
			</h1>

			<div className='flex flex-col'>
				{formatExperiences(experiences).map((props, index) => (
					<React.Fragment key={index}>
						<Experience {...props} />
						{index < experiences.length - 1 && <Separator className='my-8' />}
					</React.Fragment>
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
	return (
		<div className='flex-1'>
			<div className='mb-3'>
				<Link
					href={url}
					target='_blank'
					className='text-lg font-semibold tracking-tight mb-1 underline decoration-muted-foreground/50 hover:decoration-muted-foreground underline-offset-2'
				>
					{company}
				</Link>

				<div className='flex flex-col'>
					<span className='text-sm text-muted-foreground'>
						{duration.startDate} - {duration.endDate} · {duration.totalDuration}
					</span>
					<span className='text-sm text-muted-foreground'>{location}</span>
				</div>
			</div>

			<div className='flex flex-col gap-6 relative'>
				{positions.map(
					({ title, description, period, covers, skills }, index) => (
						<div key={index} className='relative pl-6'>
							<div className='absolute left-0 top-1.5 size-2 rounded-full bg-muted-foreground' />
							{index !== positions.length - 1 && (
								<div className='absolute left-[3px] top-4 bottom-[-24px] w-[1px] bg-border' />
							)}

							<div className='leading-relaxed mb-1'>
								<h3
									className='tracking-tight font-medium'
									style={euclidMedium.style}
								>
									{title}
								</h3>

								<span className='text-sm text-muted-foreground'>
									{period.startDate} - {period.endDate} · {period.duration}
								</span>
							</div>

							<p
								className='leading-relaxed'
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>

							{covers && covers.length > 0 && (
								<div className='mt-4 flex flex-wrap gap-3'>
									{covers.map((cover, index) => (
										<ImageWrapper
											key={index}
											src={cover}
											alt={`${title} - ${company} (cover ${index + 1})`}
											aspectRatio={2 / 1.1}
											className='md:max-w-6 shadow-lg'
										/>
									))}
								</div>
							)}

							<div className='flex flex-wrap gap-2 mt-4'>
								{skills.map((skill, skillIndex) => (
									<Badge key={skillIndex} variant='secondary'>
										{skill}
									</Badge>
								))}
							</div>
						</div>
					)
				)}
			</div>
		</div>
	)
}
