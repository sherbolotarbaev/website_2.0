import React from 'react'

import type { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import { cn } from 'utils'

type ImageThumbnailProps = Omit<
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>,
	'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
> & {
	src: string
	alt: string
	aspectRatio?: number
	placeholder?: PlaceholderValue
	blurDataURL?: string
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
	src,
	alt,
	aspectRatio = 2 / 0.9,
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'relative border-[0.08rem] border-muted/80 rounded-2xl overflow-hidden aspect-[--aspect-ratio] w-full text-sm has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-1',
				className
			)}
			style={
				{
					'--aspect-ratio': aspectRatio,
					'--height': '205px',
				} as React.CSSProperties
			}
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes='100vw'
				loading='lazy'
				decoding='async'
				className='aspect-[--aspect-ratio] object-cover'
				style={{
					position: 'absolute',
					height: '100%',
					width: '100%',
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
					color: 'transparent',
				}}
				{...props}
			/>
		</div>
	)
}

export default ImageThumbnail
