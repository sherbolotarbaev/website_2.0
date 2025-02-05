'use client'

import React from 'react'

import { useMediaQuery } from 'hooks/use-media-query'

import IndigoDot from 'shared/ui/indigo-dot'
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

import { euclidBold } from 'fonts'

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
					<div className='flex flex-col h-[calc(100vh-40rem)] max-h-[405px]'>
						{title && (
							<DialogHeader className='flex-shrink-0'>
								<DialogTitle style={euclidBold.style}>
									{title}
									<IndigoDot />
								</DialogTitle>
								{description && (
									<DialogDescription>{description}</DialogDescription>
								)}
							</DialogHeader>
						)}

						<ScrollArea className='flex-1'>{children}</ScrollArea>
					</div>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer
			open={open}
			onOpenChange={onOpenChange}
			snapPoints={[0.7, 1]}
			activeSnapPoint={0.7}
			fixed
			disablePreventScroll
			repositionInputs={false}
			snapToSequentialPoint
		>
			<DrawerContent>
				{title && (
					<DrawerHeader className='flex-shrink-0'>
						<DrawerTitle style={euclidBold.style}>
							{title}
							<IndigoDot />
						</DrawerTitle>

						{description && (
							<DrawerDescription>{description}</DrawerDescription>
						)}
					</DrawerHeader>
				)}

				<ScrollArea className='flex-1'>{children}</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}

export default BottomSheet
