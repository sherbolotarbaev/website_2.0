'use client'

import React from 'react'

import { useMediaQuery } from 'hooks/use-media-query'

import { DialogTitle } from '@radix-ui/react-dialog'
import { Dialog, DialogContent } from 'ui/dialog'
import { Drawer, DrawerContent, DrawerTitle } from 'ui/drawer'

interface BottomSheetProps {
	open?: boolean
	onOpenChange?(open: boolean): void
	children: React.ReactNode
}

const BottomSheet: React.FC<BottomSheetProps> = ({
	open,
	onOpenChange,
	children,
}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogTitle></DialogTitle>
				<DialogContent className='sm:max-w-[425px] flex items-center justify-center'>
					{children}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerTitle></DrawerTitle>
			<DrawerContent className='h-[70vh] max-h-[70vh]'>
				<div className='h-full flex flex-col items-center justify-center overflow-hidden'>
					<div className='w-full flex-1 overflow-y-auto p-4'>{children}</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default BottomSheet
