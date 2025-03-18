'use client'

import type React from 'react'
import { useEffect } from 'react'

import { closeModal, ModalTypesEnum, openModal } from 'features/modal-slice'
import { RootState } from 'lib/store'
import { useDispatch, useSelector } from 'react-redux'

import BottomSheet from '../bottom.sheet'
import { ContactButton } from './button'
import ContactForm from './form'

import { socialMedia } from 'config/social-media'

const ContactModal: React.FC = () => {
	const dispatch = useDispatch()
	const { isOpen, modalType } = useSelector((state: RootState) => state.modal)

	useEffect(() => {
		const checkHash = () => {
			if (window.location.hash === '#contact') {
				dispatch(openModal({ type: ModalTypesEnum.CONTACT }))
			}
		}
		checkHash()
		window.addEventListener('hashchange', checkHash)
		return () => {
			window.removeEventListener('hashchange', checkHash)
		}
	}, [dispatch])

	const handleClose = () => {
		dispatch(closeModal())
		// Remove the hash from the URL when closing the modal
		history.pushState(
			null,
			document.title,
			window.location.pathname + window.location.search
		)
	}

	if (!isOpen || modalType !== ModalTypesEnum.CONTACT) {
		return null
	}

	return (
		<BottomSheet
			open={isOpen}
			onOpenChange={handleClose}
			title='Contact me'
			// description="Have a question, a project idea, or just want to say hello? Drop me a message below, and I'll get back to you as soon as possible."
		>
			<div className='flex flex-col gap-2.5 py-4'>
				<div className='px-4'>
					<ContactForm />
				</div>

				<div
					className='px-4
				 py-2 text-xs font-medium tracking-wider text-muted-foreground'
				>
					SOCIALS
				</div>

				{socialMedia.map(({ name, href }, index) => (
					<ContactButton
						key={index}
						text={name}
						variant='outline'
						link={href}
					/>
				))}
			</div>
		</BottomSheet>
	)
}

export default ContactModal
