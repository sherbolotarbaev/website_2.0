import type React from 'react'

interface GradientCardProps {
	children: React.ReactNode
}

const GradientCard: React.FC<GradientCardProps> = ({ children }) => {
	return (
		<div className='w-full container rounded-[2.5rem] lg:rounded-custom bg-custom-blue-gradient overflow-hidden py-10 px-8 lg:px-20'>
			{children}
		</div>
	)
}

export default GradientCard
