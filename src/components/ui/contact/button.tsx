'use client'

import { ModalTypesEnum, openModal } from 'features/modal-slice'
import { useDispatch } from 'react-redux'

import { Button } from 'ui/button'

import { MessageCircle } from 'lucide-react'

interface ContactButtonProps {
	text?: string
}

const ContactButton: React.FC<ContactButtonProps> = ({
	text = 'Get in touch',
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
		<Button variant='cool' onClick={handleOpenModal}>
			<MessageCircle /> {text}
		</Button>
	)
}

export default ContactButton
