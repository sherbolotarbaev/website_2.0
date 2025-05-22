'use client'

import { ModalTypesEnum, openModal } from 'features/modal-slice'
import { useAppDispatch } from 'lib/store'
import { useTheme } from 'next-themes'
import type React from 'react'
import { useMemo } from 'react'

import ExpandableNavTabs, { type TabItem } from './ui/expandable-nav-tabs'

import { PagesEnum } from 'config/pages'

import { Home, MessageCircle, Moon, Rss, Sun } from 'lucide-react'

const Header: React.FC = () => {
	const dispatch = useAppDispatch()
	const { theme, setTheme } = useTheme()

	const handleContactClick = useMemo(
		() => () => {
			dispatch(openModal({ type: ModalTypesEnum.CONTACT }))
		},
		[dispatch]
	)

	const handleThemeChange = useMemo(
		() => () => {
			setTheme(theme === 'dark' ? 'light' : 'dark')
		},
		[theme, setTheme]
	)

	const tabs = useMemo<TabItem[]>(
		() => [
			{
				title: 'Home',
				icon: Home,
				// iconFilled: Home
				href: PagesEnum.HOME,
				'aria-label': 'Navigate to home page',
			},
			{
				title: 'Blog',
				icon: Rss,
				href: PagesEnum.BLOG,
				'aria-label': 'Navigate to blog page',
			},
			{ type: 'separator' },
			{
				title: 'Contact',
				icon: MessageCircle,
				onClick: handleContactClick,
				'aria-label': 'Open contact modal',
			},
			{
				title: theme === 'dark' ? 'Light' : 'Dark',
				icon: theme === 'dark' ? Sun : Moon,
				onClick: handleThemeChange,
				'aria-label': 'Change theme',
			},
		],
		[handleContactClick, handleThemeChange]
	)

	return (
		<header className='fixed bottom-2 w-full max-w-sm sm:max-w-none left-1/2 z-50 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:sticky sm:top-4 sm:flex sm:justify-center'>
			<ExpandableNavTabs tabs={tabs} />
		</header>
	)
}

export default Header
