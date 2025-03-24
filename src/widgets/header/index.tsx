'use client'

// import Logo from 'shared/ui/logo'
// import ModeToggle from 'ui/mode-toggle'
// import NavLinks from './ui/nav-links'
import Link from 'next/link'
import { Dock, DockIcon, DockItem, DockLabel } from 'ui/dock'

// import { useScrollVisibility } from 'hooks/use-scroll-visibility'
import { ContactEnum } from 'config/contact'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { cn } from 'utils'

import {
	BookOpen,
	HomeIcon,
	Mail,
	MessageCircle,
	Sun,
	SunMoon,
} from 'lucide-react'

interface DockItem {
	title: string
	icon: React.ReactNode
	href?: string
	onClick?: () => void
}

const DockIconWrapper = ({
	icon,
	isActive,
}: {
	icon: React.ReactNode
	isActive?: boolean
}) => (
	<div className={cn('h-full w-full', isActive && 'text-white')}>{icon}</div>
)

const Header = () => {
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()

	const data = useMemo<DockItem[]>(
		() => [
			{
				title: 'Home',
				icon: <HomeIcon className='h-full w-full' />,
				href: '/',
			},
			{
				title: 'Blog',
				icon: <BookOpen className='h-full w-full' />,
				href: '/blog',
			},
			{
				title: 'Contact',
				icon: <MessageCircle className='h-full w-full' />,
				href: '#contact',
				onClick: () => {
					window.location.href = '#contact'
				},
			},
			{
				title: 'Email',
				icon: <Mail className='h-full w-full' />,
				href: ContactEnum.EMAIL,
			},
			{
				title: 'Theme',
				icon:
					theme === 'dark' ? (
						<Sun className='h-full w-full' />
					) : (
						<SunMoon className='h-full w-full' />
					),
				onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
			},
		],
		[theme, setTheme]
	)

	const isActive = (href?: string) => {
		if (!href) return false
		return href === '/' ? pathname === href : pathname.startsWith(href)
	}

	return (
		// <header
		// 	className={cn(
		// 		'sticky top-0 left-0 right-0 z-40 w-full transition-all duration-300',
		// 		isVisible ? 'translate-y-4' : '-translate-y-full'
		// 	)}
		// >
		// 	<div className='h-16 container flex items-center'>
		// 		<Logo />

		// 		<NavLinks className='ml-4 flex flex-row' />

		// 		<div className='flex flex-1 items-center justify-end'>
		// 			<nav className='flex items-center gap-4'>
		// 				<ModeToggle />
		// 			</nav>
		// 		</div>
		// 	</div>
		// </header>

		<Dock className='fixed z-50 bottom-8 left-1/2 -translate-x-1/2 items-end pb-3 shadow-xl'>
			{data.map((item, idx) => {
				const dockItem = (
					<DockItem
						key={idx}
						className={cn(
							'aspect-square rounded-full bg-background',
							isActive(item.href) && 'bg-indigo-500 text-white'
						)}
						onClick={item.onClick}
					>
						<DockLabel>{item.title}</DockLabel>
						<DockIcon>
							<DockIconWrapper
								icon={item.icon}
								isActive={isActive(item.href)}
							/>
						</DockIcon>
					</DockItem>
				)

				if (item.href) {
					return (
						<Link key={idx} href={item.href} passHref>
							{dockItem}
						</Link>
					)
				}

				return dockItem
			})}
		</Dock>
	)
}

export default Header
