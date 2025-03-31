'use client'

import { useMouseAnimation } from 'hooks/use-mouse-animation'

import Hero from 'ui/sections/hero'
import Projects from 'ui/sections/projects'
import Work from 'ui/sections/work'

export default function HomeClient() {
	const containerRef = useMouseAnimation()

	return (
		<>
			<div
				ref={containerRef}
				className='container py-8 bg-background rounded-[32px] space-y-16'
			>
				<Hero />
				<Work />
				<Projects />
			</div>
		</>
	)
}
