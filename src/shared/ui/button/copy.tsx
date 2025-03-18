'use client'

import type React from 'react'
import { useState } from 'react'

import { Button } from 'ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'ui/tooltip'

import { Check, Clipboard } from 'lucide-react'

interface CopyButtonProps {
	content: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
	const [copied, setCopied] = useState(false)

	const copy = () => {
		navigator.clipboard.writeText(content)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						onClick={copy}
						className='absolute right-3 top-3 p-0 size-6 z-20 hover:bg-zinc-700 rounded-md'
					>
						{copied ? (
							<Check className='size-3.5 text-white' />
						) : (
							<Clipboard className='size-3.5 text-white' />
						)}
						<span className='sr-only'>Copy code</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{copied ? 'Copied!' : 'Copy'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default CopyButton
