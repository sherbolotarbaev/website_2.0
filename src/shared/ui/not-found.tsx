'use client'

import type React from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import RainbowButton from './button/rainbow'

import { ContactEnum } from 'config/contact'

const Player = dynamic(
	() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
	{
		ssr: false,
	}
)

const NotFound: React.FC = () => {
	return (
		<div className='container flex items-center justify-center h-screen'>
			<div className='text-center'>
				<Player
					autoplay
					loop
					src='https://lottie.host/34e51e6f-4ff4-4bc4-a952-f4516ca57b10/8Z6kQwKQJe.json'
					style={{ height: '150px', width: '150px' }}
				/>

				<div className='space-y-3'>
					<h1 className='text-xl font-bold tracking-tight'>
						Oh no! This page doesn't exist.
					</h1>
					<p className='leading-7 max-w-md text-muted-foreground'>
						If you expected to see something here, let me know (
						<Link
							href={ContactEnum.EMAIL}
							className='hover:text-primary hover:underline'
						>
							{ContactEnum.EMAIL.replace('mailto:', '')}
						</Link>
						).
					</p>

					<Link href='/' passHref>
						<RainbowButton className='mt-8' size='lg'>
							Go back
						</RainbowButton>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound
