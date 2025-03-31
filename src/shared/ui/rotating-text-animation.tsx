'use client'

import { motion } from 'framer-motion'
import type React from 'react'
import { useEffect, useState } from 'react'

import IndigoDot from './indigo-dot'

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
		const timeoutId = setTimeout(() => {
			if (currentIndex === words.length - 1) {
				setCurrentIndex(0)
			} else {
				setCurrentIndex(currentIndex + 1)
			}
		}, duration * 1000)
		return () => clearTimeout(timeoutId)
	}, [currentIndex, words])

	return (
		<span className='relative flex justify-start w-full overflow-hidden pt-0.5 pb-0.5 md:pb-1 md:pt-1'>
			&nbsp;
			{words.map((word, index) => (
				<motion.span
					key={index}
					className='absolute text-nowrap'
					initial={{ opacity: 0, y: '-100' }}
					transition={{ type: 'spring', stiffness: 50 }}
					animate={
						currentIndex === index
							? {
									y: 0,
									opacity: 1,
							  }
							: {
									y: currentIndex > index ? -150 : 150,
									opacity: 0,
							  }
					}
				>
					{word}
					<IndigoDot />
				</motion.span>
			))}
		</span>
	)
}

export default RotatingTextAnimation
