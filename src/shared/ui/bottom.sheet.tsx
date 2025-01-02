'use client'

import React from 'react'

import { useMediaQuery } from 'hooks/use-media-query'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from 'ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from 'ui/drawer'
import { ScrollArea } from 'ui/scroll-area'

interface BottomSheetProps {
	open?: boolean
	onOpenChange?(open: boolean): void
	children: React.ReactNode
	title?: string
	description?: string
}

const BottomSheet: React.FC<BottomSheetProps> = ({
	open,
	onOpenChange,
	children,
	title,
	description,
}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className='max-w-[405px]'>
					{title && (
						<DialogHeader>
							<DialogTitle>
								{title}
								<span className='text-[#6A61FF]'>.</span>
							</DialogTitle>

							{description && (
								<DialogDescription>{description}</DialogDescription>
							)}
						</DialogHeader>
					)}
					{children}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				{title && (
					<DrawerHeader>
						<DrawerTitle>
							{title}
							<span className='text-[#6A61FF]'>.</span>
						</DrawerTitle>

						{description && (
							<DrawerDescription>{description}</DrawerDescription>
						)}
					</DrawerHeader>
				)}

				<ScrollArea className='overflow-y-auto'>{children}</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}

export default BottomSheet
