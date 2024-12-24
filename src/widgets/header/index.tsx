import Logo from 'shared/ui/logo'
import ModeToggle from 'ui/mode-toggle'
import NavLinks from './ui/nav-links'

const Header = () => {
	return (
		<header className='sticky top-4 left-0 right-0 mx-auto z-40 w-full px-5'>
			<div className='mx-auto max-w-[560px] md:max-w-[610px] lg:max-w-[660px] bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border border-border rounded-full'>
				<div className='container flex h-14 items-center px-4'>
					<Logo />

					<NavLinks className='ml-4 flex flex-row' />

					<div className='flex flex-1 items-center justify-end'>
						<nav className='flex items-center gap-4'>
							<ModeToggle />
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
