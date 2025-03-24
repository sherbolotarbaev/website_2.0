import type React from 'react'

import Link from 'next/link'
import { ContactSubmitButton as ContactButton } from 'shared/ui/contact/button'
import RotatingTextAnimation from 'shared/ui/rotating-text-animation'
import SectionBadge from 'shared/ui/section-badge'
import { Button } from 'ui/button'

import { ContactEnum } from 'config/contact'
import { euclidSemiBold } from 'fonts'
import { links } from './lib/links'

import { Mail } from 'lucide-react'

const Hero: React.FC = () => {
	return (
		<section className='space-y-6'>
			<div className='space-y-4'>
				<Link href='/cv/sherbolot-arbaev.pdf' target='_blank' passHref>
					<SectionBadge className='w-fit flex items-center gap-1'>
						Open to Opportunities{' '}
						<span className='text-indigo-500 font-normal'>• Read CV</span>
					</SectionBadge>
				</Link>

				<h1
					className='text-3xl sm:text-4xl md:text-5xl tracking-tighter font-semibold'
					style={euclidSemiBold.style}
				>
					<span>Sher Arbaev</span>
					<RotatingTextAnimation
						words={[
							'NodeJS Developer',
							'Development Lead',
							'Software Engineer',
							'Software Strategist',
						]}
					/>
				</h1>

				<p className='leading-relaxed'>
					I'm a software engineer 🇰🇬, problem solver, and optimist 😎. I work at{' '}
					<HeroLink href={links.wedevx}>WEDEVX</HeroLink>, where I design and
					build backend infrastructures and microservices using{' '}
					<HeroLink href={links.nextjs}>Nest.js</HeroLink> and{' '}
					<HeroLink href={links.fastify}>Fastify</HeroLink>.
				</p>
			</div>

			<div className='flex items-center gap-2'>
				<ContactButton size='lg' />

				<Link href={ContactEnum.EMAIL} passHref>
					<Button size='lg'>
						<Mail /> Email
					</Button>
				</Link>
			</div>
		</section>
	)
}

export default Hero

interface HeroLinkProps {
	href: string
	children: React.ReactNode
}

const HeroLink: React.FC<HeroLinkProps> = ({ href, children }) => {
	return (
		<Link
			href={href}
			className='font-semibold underline decoration-muted-foreground/50 hover:decoration-muted-foreground underline-offset-2'
		>
			{children}
		</Link>
	)
}
