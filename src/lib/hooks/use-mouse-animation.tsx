'use client'

import { RefObject, useEffect, useRef } from 'react'

function useMouseAnimation<T extends HTMLDivElement>(): RefObject<T | null> {
	const elementRef = useRef<T>(null)

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

		document.addEventListener('mousemove', handleMouseMove)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return elementRef
}

export { useMouseAnimation }
