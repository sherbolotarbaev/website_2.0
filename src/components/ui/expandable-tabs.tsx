'use client'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useMediaQuery } from 'hooks/use-media-query'
import { useOnClickOutside } from 'hooks/use-on-click-outside'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { memo, useCallback, useMemo, useRef, useState } from 'react'

import Link from 'next/link'

import { cn } from 'utils'

import { LucideIcon } from 'lucide-react'

interface Tab {
	title: string
	icon: LucideIcon
	type?: never
	href?: string
	onClick?: () => void
	'aria-label'?: string
}

interface Separator {
	type: 'separator'
	title?: never
	icon?: never
	href?: never
	onClick?: never
	'aria-label'?: never
}

export type TabItem = Tab | Separator

interface ExpandableTabsProps {
	tabs: TabItem[]
	className?: string
	activeColor?: string
	onChange?: (index: number | null) => void
}

const SPRING_ANIMATION = {
	type: 'spring',
	stiffness: 300,
	damping: 20,
} as const

const HOVER_SCALE_ANIMATION = {
	scale: 1.05,
	transition: SPRING_ANIMATION,
} as const

const TAP_SCALE_ANIMATION = {
	scale: 0.95,
} as const

const buttonVariants = {
	initial: {
		gap: 0,
		paddingLeft: '.5rem',
		paddingRight: '.5rem',
	},
	animate: (isSelected: boolean) => ({
		gap: isSelected ? '.5rem' : 0,
		paddingLeft: isSelected ? '1rem' : '.5rem',
		paddingRight: isSelected ? '1rem' : '.5rem',
	}),
} satisfies Variants

const spanVariants = {
	initial: { width: 0, opacity: 0 },
	animate: { width: 'auto', opacity: 1 },
	exit: { width: 0, opacity: 0 },
} satisfies Variants

const transition = { delay: 0.1, type: 'spring', bounce: 0, duration: 0.6 }

const Separator = memo(() => (
	<div
		className='mx-1 h-[24px] w-[1.2px] bg-border'
		aria-hidden='true'
		role='separator'
	/>
))

Separator.displayName = 'Separator'

const ExpandableTabs: React.FC<ExpandableTabsProps> = memo(
	({ tabs, className, activeColor = 'text-primary', onChange }) => {
		const pathname = usePathname()
		const [selected, setSelected] = useState<number | null>(null)
		const outsideClickRef = useRef<HTMLDivElement>(null)
		const isMobile = useMediaQuery('(max-width: 768px)')

		const handleClickOutside = useCallback(() => {
			setSelected(null)
			onChange?.(null)
		}, [onChange])

		useOnClickOutside(outsideClickRef, handleClickOutside)

		const handleSelect = useCallback(
			(index: number) => {
				setSelected(index)
				onChange?.(index)
			},
			[onChange]
		)

		const renderTab = useCallback(
			(tab: Tab, index: number) => {
				const isActive =
					selected === index ||
					(tab.href &&
						(tab.href === '/'
							? pathname === tab.href
							: pathname.startsWith(tab.href)))

				const Icon = tab.icon
				const ariaLabel = tab['aria-label'] || tab.title

				const Tab = (
					<motion.button
						key={tab.title}
						variants={buttonVariants}
						initial={false}
						animate='animate'
						custom={isActive}
						onClick={() => {
							handleSelect(index)
							tab.onClick?.()
						}}
						transition={transition}
						whileHover={HOVER_SCALE_ANIMATION}
						whileTap={TAP_SCALE_ANIMATION}
						className={cn(
							'relative flex items-center rounded-xl px-4 py-2 text-md font-medium transition-colors duration-300',
							isActive
								? cn('bg-muted', activeColor)
								: 'text-muted-foreground hover:bg-muted hover:text-foreground'
						)}
						aria-label={ariaLabel}
						aria-current={isActive ? 'page' : undefined}
					>
						<Icon size={isMobile ? 20 : 23} aria-hidden='true' />
						<AnimatePresence initial={false}>
							{isActive && (
								<motion.span
									variants={spanVariants}
									initial='initial'
									animate='animate'
									exit='exit'
									transition={transition}
									className='overflow-hidden'
								>
									{tab.title}
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				)

				if (tab.href) {
					return (
						<Link href={tab.href} key={tab.title} passHref>
							{Tab}
						</Link>
					)
				}

				return Tab
			},
			[selected, pathname, handleSelect, activeColor]
		)

		const renderedTabs = useMemo(
			() =>
				tabs.map((tab, index) => {
					if (tab.type === 'separator') {
						return <Separator key={`separator-${index}`} />
					}
					return renderTab(tab, index)
				}),
			[tabs, renderTab]
		)

		return (
			<div
				ref={outsideClickRef}
				className={cn(
					'flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1.5 shadow-sm',
					className
				)}
				role='navigation'
				aria-label='Main navigation'
			>
				{renderedTabs}
			</div>
		)
	}
)

ExpandableTabs.displayName = 'ExpandableTabs'

export default ExpandableTabs
