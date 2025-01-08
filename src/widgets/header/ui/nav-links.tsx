'use client'

import React from 'react'

import Link from 'next/link'

import { ModalTypesEnum, openModal } from 'features/modal-slice'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { cn } from 'utils'

import { routes } from '../lib/routes'

interface NavLinksProps {
	className?: string
	onClick?: () => void
}

const NavLinks: React.FC<NavLinksProps> = ({ className, onClick }) => {
	const pathname = usePathname()
	const dispatch = useDispatch()

	return (
		<nav className={cn('flex', className)}>
			{routes.map(route => (
				<Link
					key={route.path}
					href={route.path}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						pathname.startsWith(route.path)
							? 'text-primary font-semibold'
							: 'text-muted-foreground',
						className?.includes('flex-col') ? 'py-2' : 'px-4 py-2'
					)}
					onClick={onClick}
				>
					{route.name}
				</Link>
			))}

			<div
				className='cursor-pointer text-sm text-muted-foreground font-medium transition-colors hover:text-primary px-4 py-2'
				onClick={() => dispatch(openModal({ type: ModalTypesEnum.CONTACT }))}
			>
				Contact
			</div>
		</nav>
	)
}

export default NavLinks
