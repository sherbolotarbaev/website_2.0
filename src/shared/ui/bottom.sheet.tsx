'use client'

import React from 'react'

import { useMediaQuery } from 'hooks/use-media-query'

import IndigoDot from 'shared/ui/indigo-dot'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from 'ui/drawer'
import { ScrollArea } from 'ui/scroll-area'

import { euclidBold } from 'fonts'

interface BottomSheetProps {
	open?: boolean
	onOpenChange?(open: boolean): void
	children: React.ReactNode
	title?: string
}

// const snapPoints = [0.7, 1]

const BottomSheet: React.FC<BottomSheetProps> = ({
	open,
	onOpenChange,
	children,
	title,
}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')
	// const [snap, setSnap] = useState<number | string | null>(snapPoints[0])

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className='max-w-[405px]'>
					<div className='flex flex-col max-h-[405px]'>
						{title && (
							<DialogHeader className='flex-shrink-0'>
								<DialogTitle style={euclidBold.style}>
									{title}
									<IndigoDot />
								</DialogTitle>
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
			// snapPoints={snapPoints}
			// activeSnapPoint={snap}
			// setActiveSnapPoint={setSnap}
			fixed
			disablePreventScroll
			repositionInputs={false}
			// snapToSequentialPoint
			autoFocus
		>
			<DrawerContent>
				<div
					className='flex flex-col w-full'
					// className={cn('flex flex-col w-full', {
					// 	'overflow-y-auto': snap === 1,
					// 	'overflow-hidden': snap !== 1,
					// })}
				>
					{title && (
						<DrawerHeader className='flex-shrink-0'>
							<DrawerTitle style={euclidBold.style}>
								{title}
								<IndigoDot />
							</DrawerTitle>
						</DrawerHeader>
					)}

					<ScrollArea className='flex-1'>{children}</ScrollArea>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default BottomSheet
