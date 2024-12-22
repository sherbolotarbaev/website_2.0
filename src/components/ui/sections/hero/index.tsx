import Link from 'next/link'
import ContactButton from 'shared/ui/contact/button'
import { Button } from 'ui/button'

import { ContactEnum } from 'config/contact'
import { euclidSemiBold } from 'fonts'
import { links } from './lib/links'

import { Mail } from 'lucide-react'

const Hero: React.FC = () => {
	return (
		<section className='space-y-6'>
			<div className='space-y-3'>
				<h1
					className='text-2xl font-semibold tracking-tight'
					style={euclidSemiBold.style}
				>
					Sher Arbaev<span className='text-[#6A61FF]'>.</span>
				</h1>

				<p className='leading-relaxed'>
					I'm a software engineer, problem solver, and optimist. I work at{' '}
					<HeroLink href={links.wedevx}>WEDEVX</HeroLink>, where I design and
					build backend infrastructures and microservices using{' '}
					<HeroLink href={links.nextjs}>Nest.js</HeroLink> and{' '}
					<HeroLink href={links.fastify}>Fastify</HeroLink>.
				</p>
			</div>

			<div className='flex items-center gap-2'>
				<ContactButton />

				<Link href={ContactEnum.EMAIL} passHref>
					<Button>
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
