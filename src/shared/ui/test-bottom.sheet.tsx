'use client'

import * as React from 'react'

import { motion, PanInfo, useAnimation, useMotionValue } from 'framer-motion'

import { euclidBold } from 'fonts'

interface BottomSheetProps {
	open?: boolean
	onOpenChange?(open: boolean): void
	children: React.ReactNode
	title?: string
	description?: string
}

const SNAP_POINTS = [100, 80, 80] // percentage of screen height

const BottomSheet: React.FC<BottomSheetProps> = ({
	open,
	onOpenChange,
	children,
	title,
	description,
}) => {
	const controls = useAnimation()
	const y = useMotionValue(0)
	const [currentSnapPoint, setCurrentSnapPoint] = React.useState(SNAP_POINTS[1])

	React.useEffect(() => {
		if (open) {
			controls.start({ y: `${100 - currentSnapPoint}%` })
		} else {
			controls.start({ y: '100%' })
		}
	}, [open, controls, currentSnapPoint])

	const handleDragEnd = (_: never, info: PanInfo) => {
		const yPosition = info.offset.y
		const velocity = info.velocity.y

		if (velocity > 500) {
			onOpenChange?.(false)
			return
		}

		const closestSnapPoint = SNAP_POINTS.reduce((prev, curr) =>
			Math.abs(curr - (100 - (yPosition / window.innerHeight) * 100)) <
			Math.abs(prev - (100 - (yPosition / window.innerHeight) * 100))
				? curr
				: prev
		)

		controls.start({ y: `${100 - closestSnapPoint}%` })
		setCurrentSnapPoint(closestSnapPoint)
	}

	const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onOpenChange?.(false)
		}
	}

	if (!open) return null

	return (
		<motion.div
			className='fixed inset-0 bg-primary/40 z-50 overflow-hidden touch-none'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={handleOutsideClick}
		>
			<motion.div
				className='absolute inset-x-0 bottom-0 bg-background rounded-t-[32px] touch-none max-w-lg mx-auto'
				style={{ y }}
				initial={{ y: '100%' }}
				animate={controls}
				exit={{ y: '100%' }}
				transition={{ type: 'spring', damping: 30, stiffness: 300 }}
				drag='y'
				dragConstraints={{ top: 0, bottom: 0 }}
				dragElastic={0.2}
				onDragEnd={handleDragEnd}
			>
				<div className='mx-auto mt-4 h-1 w-12 rounded-full bg-muted-foreground/50' />
				<div className='grid gap-1.5 p-4 text-center sm:text-left'>
					<h2
						className='text-xl font-semibold leading-none tracking-tight'
						style={euclidBold.style}
					>
						{title}
					</h2>

					<p className='text-sm text-muted-foreground'>{description}</p>
				</div>

				<div className='overflow-y-auto p-4' style={{ height: '83dvh' }}>
					{children}
				</div>
			</motion.div>
		</motion.div>
	)
}

export default BottomSheet
