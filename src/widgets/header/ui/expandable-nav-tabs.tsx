'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useMediaQuery } from 'hooks/use-media-query'
import { useOnClickOutside } from 'hooks/use-on-click-outside'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { memo, useCallback, useMemo, useRef, useState } from 'react'

import Link from 'next/link'

import { cn } from 'utils'

import type { LucideIcon } from 'lucide-react'

interface Tab {
	title?: string
	icon: LucideIcon
	iconFilled?: LucideIcon
	type?: never
	href?: string
	onClick?: () => void
	'aria-label'?: string
}

interface Separator {
	type: 'separator'
	title?: never
	icon?: never
	iconFilled?: never
	href?: never
	onClick?: never
	'aria-label'?: never
}

export type TabItem = Tab | Separator

const ANIMATIONS = {
	spring: {
		type: 'spring',
		stiffness: 300,
		damping: 20,
	} as const,
	hover: {
		scale: 1.05,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 20,
		},
	} as const,
	tap: {
		scale: 0.95,
	} as const,
	transition: {
		delay: 0.1,
		type: 'spring',
		bounce: 0,
		duration: 0.6,
	},
} as const

const BUTTON_VARIANTS = {
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

const SPAN_VARIANTS = {
	initial: { width: 0, opacity: 0 },
	animate: { width: 'auto', opacity: 1 },
	exit: { width: 0, opacity: 0 },
} satisfies Variants

const Separator: React.FC = memo(() => (
	<div
		className='mx-1 h-[24px] w-[1.2px] bg-border'
		aria-hidden='true'
		role='separator'
	/>
))

Separator.displayName = 'Separator'

interface TabProps {
	tab: Tab
	isActive: boolean
	activeColor: string
	onSelect: () => void
}

const MobileTab: React.FC<TabProps> = memo(
	({ tab, isActive, activeColor, onSelect }) => {
		const Icon = isActive && tab.iconFilled ? tab.iconFilled : tab.icon
		const ariaLabel = tab['aria-label'] || tab.title

		return (
			<motion.button
				onClick={() => {
					if (tab.onClick) {
						tab.onClick()
					} else onSelect()
				}}
				className={cn(
					'relative flex flex-col w-14 items-center justify-center rounded-xl px-3 pt-2.5 pb-1 transition-colors duration-300 [&_svg]:pointer-events-none [&_svg]:size-7 [&_svg]:shrink-0',
					isActive
						? activeColor
						: 'text-muted-foreground active:text-foreground'
				)}
				aria-label={ariaLabel}
				aria-current={isActive ? 'page' : undefined}
			>
				{isActive && (
					<motion.div
						layoutId='activeTab'
						className='absolute -top-[1px] w-7 h-0.5 bg-primary rounded-xl'
						transition={ANIMATIONS.spring}
					/>
				)}
				<Icon aria-hidden='true' />
				<span className='text-[0.6rem] tracking-tight'>{tab.title}</span>
			</motion.button>
		)
	}
)

MobileTab.displayName = 'MobileTab'

const DesktopTab: React.FC<TabProps> = memo(
	({ tab, isActive, activeColor, onSelect }) => {
		const Icon = tab.icon
		const ariaLabel = tab['aria-label'] || tab.title

		return (
			<motion.button
				variants={BUTTON_VARIANTS}
				initial={false}
				animate='animate'
				custom={isActive}
				onClick={() => {
					if (tab.onClick) {
						tab.onClick()
					} else onSelect()
				}}
				transition={ANIMATIONS.transition}
				whileHover={ANIMATIONS.hover}
				whileTap={ANIMATIONS.tap}
				className={cn(
					'flex justify-center items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
					isActive
						? cn('bg-accent', activeColor)
						: 'text-muted-foreground hover:bg-accent hover:text-foreground active:bg-accent active:text-foreground'
				)}
				aria-label={ariaLabel}
				aria-current={isActive ? 'page' : undefined}
			>
				<Icon aria-hidden='true' />
				<AnimatePresence initial={false}>
					{isActive && tab.title && (
						<motion.span
							variants={SPAN_VARIANTS}
							initial='initial'
							animate='animate'
							exit='exit'
							transition={ANIMATIONS.transition}
							className='overflow-hidden'
						>
							{tab.title}
						</motion.span>
					)}
				</AnimatePresence>
			</motion.button>
		)
	}
)

DesktopTab.displayName = 'DesktopTab'

interface ExpandableNavTabsProps {
	tabs: TabItem[]
	className?: string
	activeColor?: string
	onChange?: (index: number | null) => void
	enableMobile?: boolean
}

const ExpandableNavTabs: React.FC<ExpandableNavTabsProps> = memo(
	({
		tabs,
		className,
		activeColor = 'text-primary',
		onChange,
		enableMobile = true,
	}) => {
		const pathname = usePathname()
		const [selected, setSelected] = useState<number | null>(null)
		const outsideClickRef = useRef<HTMLDivElement>(null)
		const isMobile = enableMobile ? useMediaQuery('(max-width: 768px)') : false

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
				const isActive = Boolean(
					selected === index ||
						(tab.href &&
							(tab.href === '/'
								? pathname === tab.href
								: pathname.startsWith(tab.href)))
				)

				const TabComponent = isMobile ? MobileTab : DesktopTab
				const tabProps = {
					tab,
					isActive,
					activeColor,
					onSelect: () => handleSelect(index),
				}

				if (tab.href) {
					return (
						<Link href={tab.href} key={tab.title} passHref>
							<TabComponent {...tabProps} />
						</Link>
					)
				}

				return <TabComponent key={tab.title || tab.icon.name} {...tabProps} />
			},
			[selected, pathname, handleSelect, activeColor, isMobile]
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
			<nav
				ref={outsideClickRef}
				className={cn(
					'relative flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 py-1.5 bg-background dark:bg-zinc-900 shadow-lg p-1.5',
					isMobile &&
						'justify-around border-0 border-t px-2 py-0 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,1)]',
					className
				)}
				role='navigation'
				aria-label={isMobile ? 'Mobile navigation' : 'Desktop navigation'}
			>
				{renderedTabs}
			</nav>
		)
	}
)

ExpandableNavTabs.displayName = 'ExpandableNavTabs'

export default ExpandableNavTabs
