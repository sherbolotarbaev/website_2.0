'use client'

import type React from 'react'

import { siteConfig } from 'config/site'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from 'utils'

interface LogoProps {
	size?: number
	className?: string
	asLink?: boolean
}

const Logo: React.FC<LogoProps> = ({
	size = 6.5,
	className,
	asLink = false,
}) => {
	const Img = (
		<Image
			src='/images/logo.png'
			alt={siteConfig.title}
			width={35}
			height={35}
			className={cn(`size-${size} max-w-${size}`, className)}
			loading='lazy'
			placeholder='blur'
			blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAT0lEQVR4nAFEALv/AAAAAADJyckztra2RgAAAAIAxMTEP+Li4vb9/f3/xsbGgwDDw8OK6+vr/83Nze2YmJiDAFxcXBtqampdQEBAGwAAAACyHSHCm4RaSAAAAABJRU5ErkJggg=='
		/>
	)

	if (asLink) {
		return (
			<Link href='/' passHref>
				{Img}
			</Link>
		)
	}

	return Img
}

export default Logo
