'use client'

import { ModalTypesEnum, openModal } from 'features/modal-slice'
import { useAppDispatch } from 'lib/store'
import { useTheme } from 'next-themes'
import type React from 'react'
import { useMemo } from 'react'

import ExpandableTabs, { type TabItem } from 'ui/expandable-tabs'

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
				icon: MessageCircle,
				onClick: handleContactClick,
				'aria-label': 'Open contact modal',
			},
			{
				icon: theme === 'dark' ? Sun : Moon,
				onClick: handleThemeChange,
				'aria-label': 'Change theme',
			},
		],
		[handleContactClick, handleThemeChange]
	)

	return (
		<header className='fixed bottom-0 z-50 w-full sm:sticky sm:top-4 sm:flex sm:justify-center'>
			<ExpandableTabs
				tabs={tabs}
				className='rounded-t-2xl rounded-b-none border-t sm:border border-zinc-200 dark:border-zinc-800 sm:rounded-b-2xl py-2 sm:py-1.5 flex justify-center w-full sm:w-auto'
			/>
		</header>
	)
}

export default Header
