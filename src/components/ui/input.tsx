import type React from 'react'
import { forwardRef } from 'react'

import { cn } from 'utils'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-xl bg-secondary/60 border border-input focus-visible:border-primary/20 px-3 py-2 text-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 autofill:bg-primary/20 autofill:text-primary-foreground',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
