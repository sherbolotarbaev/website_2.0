import type React from 'react'

import { Badge } from 'ui/badge'
import BorderBeam from './border-beam'

import { cn } from 'utils'

interface SectionBadgeProps {
	children: React.ReactNode
	className: string
}

const SectionBadge: React.FC<SectionBadgeProps> = ({ children, className }) => {
	return (
		<Badge
			className={cn(
				'relative px-3 py-1 border-0 rounded-full hover:bg-secondary',
				className
			)}
			variant='outline'
		>
			{children}
			<BorderBeam size={40} duration={5} />
		</Badge>
	)
}

export default SectionBadge
