import * as React from 'react'

import { cn } from 'utils'

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				'flex min-h-[60px] w-full rounded-lg bg-secondary/80 px-3 py-2 text-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:bg-secondary disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Textarea.displayName = 'Textarea'

export { Textarea }
