'use client'

import type React from 'react'
import { forwardRef } from 'react'

import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from 'utils'

const Drawer = ({
	shouldScaleBackground = true,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		shouldScaleBackground={shouldScaleBackground}
		{...props}
	/>
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn('fixed inset-0 z-50 bg-primary/10', className)}
		{...props}
	/>
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Content
				ref={ref}
				className={cn(
					'fixed inset-x-0 bottom-0 z-50 flex flex-col bg-zinc-100 dark:bg-zinc-900 backdrop-blur-xl rounded-t-[0.75rem] touch-none min-w-[24rem] h-full max-h-[97%]',
					className
				)}
				{...props}
			>
				{/* <div className='mx-auto h-0.5 w-12 absolute -top-2 left-0 right-0 rounded-full bg-muted-foreground/50' /> */}
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	)
})
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex items-center justify-between p-4 border-b rounded-t-[0.75rem]',
			className
		)}
		{...props}
	/>
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('mt-auto flex flex-col gap-2 p-4', className)}
		{...props}
	/>
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn(
			'text-xl font-semibold leading-none tracking-tight',
			className
		)}
		{...props}
	/>
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Description
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
}
