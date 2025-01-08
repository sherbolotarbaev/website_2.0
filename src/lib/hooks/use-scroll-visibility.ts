'use client'

import { useEffect, useState } from 'react'

interface UseScrollVisibilityOptions {
	threshold?: number
}

function useScrollVisibility({
	threshold = 3,
}: UseScrollVisibilityOptions = {}): boolean {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const controlVisibility = () => {
			setIsVisible(window.scrollY <= threshold)
		}

		controlVisibility()

		window.addEventListener('scroll', controlVisibility)
		return () => {
			window.removeEventListener('scroll', controlVisibility)
		}
	}, [threshold])

	return isVisible
}

export { useScrollVisibility }
