'use client'

import Logo from 'shared/ui/logo'
import ModeToggle from 'ui/mode-toggle'
import NavLinks from './ui/nav-links'

import { useScrollVisibility } from 'hooks/use-scroll-visibility'
import { cn } from 'utils'

const Header = () => {
	const isVisible = useScrollVisibility()

	return (
		<header
			className={cn(
				'sticky top-0 left-0 right-0 z-40 w-full transition-all duration-300',
				isVisible ? 'translate-y-4' : '-translate-y-full'
			)}
		>
			<div className='h-16 container flex items-center'>
				<Logo />

				<NavLinks className='ml-4 flex flex-row' />

				<div className='flex flex-1 items-center justify-end'>
					<nav className='flex items-center gap-4'>
						<ModeToggle />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
