import type React from 'react'

import Link from 'next/link'
import { ContactButton, ContactSubmitButton } from 'shared/ui/contact/button'
import RotatingTextAnimation from 'shared/ui/rotating-text-animation'
import SectionBadge, { StarIcon } from 'shared/ui/section-badge'
import BlurText from 'ui/animated-blur-text'
import { HoverPeek } from 'ui/link-preview'

import { ContactEnum } from 'config/contact'
import { links } from './lib/links'

import { Mail } from 'lucide-react'

const Hero: React.FC = () => {
	return (
		<section className='space-y-6'>
			<div className='space-y-4'>
				<Link href='/cv/sherbolot-arbaev.pdf' target='_blank' passHref>
					<SectionBadge
						className='w-fit flex items-center gap-1'
						text='Open to Opportunities'
						icon={<StarIcon />}
					></SectionBadge>
				</Link>

				<h1 className='text-3xl sm:text-4xl md:text-5xl tracking-tighter font-semibold'>
					<BlurText
						text='Sher Arbaev'
						delay={150}
						animateBy='words'
						direction='top'
					/>

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
				<ContactSubmitButton size='lg' />
				<ContactButton size='lg' link={ContactEnum.EMAIL} icon={<Mail />} />
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
		<HoverPeek url={href}>
			<Link
				href={href}
				className='font-semibold underline decoration-muted-foreground/50 hover:decoration-muted-foreground underline-offset-2'
			>
				{children}
			</Link>
		</HoverPeek>
	)
}
