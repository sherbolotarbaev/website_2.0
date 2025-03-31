'use client'

import { RefObject, useEffect, useRef } from 'react'
import { useMediaQuery } from './use-media-query'

function useMouseAnimation<T extends HTMLDivElement>(): RefObject<T | null> {
	const elementRef = useRef<T>(null)
	const isMobile = useMediaQuery('(max-width: 768px)')

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!elementRef.current) return

			const rect = elementRef.current.getBoundingClientRect()
			const x = ((e.clientX - rect.left) / rect.width) * 100
			const y = ((e.clientY - rect.top) / rect.height) * 100

			elementRef.current.style.position = 'relative'
			elementRef.current.style.setProperty('--x', `${x}%`)
			elementRef.current.style.setProperty('--y', `${y}%`)
			elementRef.current.style.background = `radial-gradient(circle at var(--x) var(--y), transparent, rgba(99, 102, 241, 0.15) 0%, transparent 10%)`
		}

		if (!isMobile) {
			document.addEventListener('mousemove', handleMouseMove)
		}

		return () => {
			if (!isMobile) {
				document.removeEventListener('mousemove', handleMouseMove)
			}
		}
	}, [isMobile])

	return elementRef
}

export { useMouseAnimation }
