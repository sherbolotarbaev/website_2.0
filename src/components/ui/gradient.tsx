import React from 'react'

interface GradientProps {
	left?: number
	top?: number
	w?: number
	h?: number
	blur?: number
}

const Gradient: React.FC<GradientProps> = ({
	left = 0,
	top = 0,
	w = 300,
	h = 200,
	blur = 61,
}) => {
	return (
		<div
			className={`bg-custom-gradient blur-[${blur}px] absolute left-${left} top-${top} w-[${w}px] h-[${h}px]`}
		></div>
	)
}

export default Gradient
