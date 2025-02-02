'use client'

import { VariantProps } from 'class-variance-authority'
import { ModalTypesEnum, openModal } from 'features/modal-slice'
import { useDispatch } from 'react-redux'

import { Button, buttonVariants } from 'ui/button'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface ContactButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	text?: string
	icon?: React.ReactElement
	link?: string
}

const ContactSubmitButton: React.FC<ContactButtonProps> = ({
	text = 'Get in touch',
	icon,
	...props
}) => {
	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(
			openModal({
				type: ModalTypesEnum.CONTACT,
			})
		)
	}

	return (
		<Button variant='cool' onClick={handleOpenModal} {...props}>
			{icon ? icon : <MessageCircle />} {text}
		</Button>
	)
}

const ContactButton: React.FC<ContactButtonProps> = ({
	text = 'Email',
	icon,
	link,
	...props
}) => {
	if (link) {
		return (
			<Link href={link} target='_blank' passHref>
				<Button size='lg' className='rounded-xl w-full' {...props}>
					{icon} {text}
				</Button>
			</Link>
		)
	}

	return (
		<Button size='lg' className='rounded-xl' {...props}>
			{icon} {text}
		</Button>
	)
}

export { ContactButton, ContactSubmitButton }
