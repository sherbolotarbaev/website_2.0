'use client'

import { ModalTypesEnum, openModal } from 'features/modal-slice'
import { useAppDispatch } from 'lib/store'
import type React from 'react'
import { useMemo } from 'react'

import ExpandableTabs, { type TabItem } from 'ui/expandable-tabs'

import { PagesEnum } from 'config/pages'

import { Home, MessageCircle, Rss } from 'lucide-react'

const Header: React.FC = () => {
	const dispatch = useAppDispatch()

	const handleContactClick = useMemo(
		() => () => {
			dispatch(openModal({ type: ModalTypesEnum.CONTACT }))
		},
		[dispatch]
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
				title: 'Contact',
				icon: MessageCircle,
				// href: '#contact',
				onClick: handleContactClick,
				'aria-label': 'Open contact modal',
			},
		],
		[handleContactClick]
	)

	return (
		<header className='fixed bottom-0 z-50 w-full sm:sticky sm:top-4 sm:flex sm:justify-center'>
			<ExpandableTabs
				tabs={tabs}
				className='rounded-t-2xl rounded-b-none py-4 sm:p-1.5 sm:rounded-2xl flex justify-center'
			/>
		</header>
	)
}

export default Header
