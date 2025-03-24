import type React from 'react'

import { Button } from 'ui/button'

import { cn } from 'utils'

interface RainbowButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
	size?: 'sm' | 'lg' | 'default' | 'icon'
}

const RainbowButton: React.FC<RainbowButtonProps> = ({
	children,
	className,
	size = 'sm',
	...props
}) => {
	return (
		<Button
			size={size}
			className={cn(
				'group relative animate-rainbow bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]',

				// before styles
				'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0_100%_63%),hsl(90_100%_63%),hsl(210_100%_63%),hsl(195_100%_63%),hsl(270_100%_63%))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]',

				// light mode colors
				'bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0_100%_63%),hsl(90_100%_63%),hsl(210_100%_63%),hsl(195_100%_63%),hsl(270_100%_63%))]',

				// dark mode colors
				'dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0_100%_63%),hsl(90_100%_63%),hsl(210_100%_63%),hsl(195_100%_63%),hsl(270_100%_63%))]',

				className
			)}
			{...props}
		>
			{children}
		</Button>
	)
}

export default RainbowButton
