'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { euclidSemiBold } from 'fonts'
import { animated, config, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'
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

const DrawerOverlay = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn('fixed inset-0 z-50 bg-primary/30', className)}
		{...props}
	/>
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)
	const initialHeight = 708 // Initial height in pixels

	const [springs, api] = useSpring(() => ({
		height: initialHeight,
		config: config.stiff,
	}))

	const bind = useDrag(
		({ movement: [, my], down, direction: [, yDir], velocity }) => {
			const windowHeight = window.innerHeight
			const currentHeight =
				contentRef.current?.getBoundingClientRect().height || initialHeight
			const newHeight = down ? currentHeight - my : currentHeight

			if (!down && velocity > 0.3) {
				if (yDir > 0) {
					api.start({ height: initialHeight })
					setIsExpanded(false)
				} else {
					api.start({ height: windowHeight })
					setIsExpanded(true)
				}
			} else {
				api.start({
					height: Math.max(initialHeight, Math.min(newHeight, windowHeight)),
				})
				setIsExpanded(newHeight > windowHeight * 0.8)
			}
		},
		{ filterTaps: true, bounds: { top: 0 }, rubberband: true }
	)

	useEffect(() => {
		const handleResize = () => {
			if (isExpanded) {
				api.start({ height: window.innerHeight })
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [isExpanded, api])

	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Content
				ref={ref}
				className={cn(
					'fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[32px] border-t bg-background',
					className
				)}
				style={{
					// @ts-expect-error
					height: springs.height,
					touchAction: 'none',
				}}
				{...props}
				{...bind()}
			>
				{/* @ts-expect-error */}
				<animated.div
					ref={contentRef}
					className='flex-grow overflow-auto'
					style={{
						height: springs.height,
					}}
				>
					<div className='mx-auto mt-4 h-1 w-12 rounded-full bg-muted-foreground' />

					{children}
				</animated.div>
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
		className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
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

const DrawerTitle = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn(
			'text-xl font-semibold leading-none tracking-tight',
			className
		)}
		style={euclidSemiBold.style}
		{...props}
	/>
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
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
