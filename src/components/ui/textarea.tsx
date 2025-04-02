import type React from 'react'
import { forwardRef } from 'react'

import { cn } from 'utils'

const Textarea = forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				'flex min-h-36 w-full rounded-xl border border-input focus-visible:border-primary/20 bg-secondary/60 px-3 py-2 text-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:bg-secondary disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Textarea.displayName = 'Textarea'

export { Textarea }
