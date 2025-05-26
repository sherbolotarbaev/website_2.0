'use client'

import { VariantProps } from 'class-variance-authority'
import { ModalTypesEnum, openModal } from 'features/modal-slice'
import { useAppDispatch } from 'lib/store'

import { Button, buttonVariants } from 'ui/button'

import { Globe, MessageCircle } from 'lucide-react'
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
	const dispatch = useAppDispatch()

	const handleOpenModal = () => {
		dispatch(
			openModal({
				type: ModalTypesEnum.CONTACT,
			})
		)
	}

	return (
		<Button onClick={handleOpenModal} {...props}>
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
				<Button size='lg' variant='outline' {...props}>
					{icon || (
						<div className='bg-background dark:bg-muted p-1 rounded-sm'>
							<Globe className='text-muted-foreground' />
						</div>
					)}

					{text}
				</Button>
			</Link>
		)
	}

	return (
		<Button variant='outline' {...props}>
			{icon} {text}
		</Button>
	)
}

export { ContactButton, ContactSubmitButton }
