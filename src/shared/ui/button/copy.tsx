'use client'

import type React from 'react'
import { useState } from 'react'

import { Button } from 'ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from 'ui/tooltip'

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
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					onClick={copy}
					className='border-zinc-600 bg-zinc-700 absolute right-3 top-3 p-0 size-6 z-20 hover:bg-zinc-600 rounded-md'
				>
					{copied ? (
						<Check className='size-3.5 text-green-300' />
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
	)
}

export default CopyButton
