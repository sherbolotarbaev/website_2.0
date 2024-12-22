'use client'

import React, { useEffect, useState } from 'react'

interface RotatingTextAnimationProps {
	words: string[]
	duration?: number
}

const RotatingTextAnimation: React.FC<RotatingTextAnimationProps> = ({
	words,
	duration = 2.5,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1) % words.length)
		}, duration * 1000)

		return () => clearInterval(interval)
	}, [words, duration])

	const getItemStyle = (index: number) => {
		const diff = (index - currentIndex + words.length) % words.length
		let rotateX = 0
		let opacity = 0
		let translateZ = 0

		if (diff === 0) {
			rotateX = 0
			opacity = 1
			translateZ = 20
		} else if (diff === 1 || diff === words.length - 1) {
			rotateX = diff === 1 ? 40 : -40
			opacity = 0
			translateZ = 10
		}

		return {
			transform: `rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
			opacity,
		}
	}

	return (
		<div className='relative h-[1.5em] w-62 text-nowrap perspective-[500px]'>
			{words.map((word, index) => (
				<div
					key={word}
					className='absolute inset-0 flex items-center justify-start transition-all duration-500 ease-in-out backface-hidden'
					style={{
						...getItemStyle(index),
						transformOrigin: 'center bottom',
					}}
				>
					{word}
					<span className='text-[#6A61FF]'>.</span>
				</div>
			))}
		</div>
	)
}

export default RotatingTextAnimation
