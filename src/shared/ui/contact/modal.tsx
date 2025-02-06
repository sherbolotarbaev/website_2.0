'use client'

import React, { useEffect } from 'react'

import { closeModal, ModalTypesEnum, openModal } from 'features/modal-slice'
import { RootState } from 'lib/store'
import { useDispatch, useSelector } from 'react-redux'

import BottomSheet from '../bottom.sheet'
import { ContactButton } from './button'
import ContactForm from './form'

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
			<div className='flex flex-col pb-4'>
				<div className='px-4'>
					<ContactForm />
				</div>

				<div
					className='px-4
				 py-2 text-xs font-medium tracking-wider text-muted-foreground'
				>
					SOCIALS
				</div>

				<ContactButton
					text='Linkedin'
					variant='outline'
					link='https://www.linkedin.com/in/sherbolotarbaev'
				/>

				<ContactButton
					text='Instagram'
					variant='outline'
					link='https://www.instagram.com/sherbolotarbaev'
				/>

				<ContactButton
					text='Telegram'
					variant='outline'
					link='https://t.me/sherbolotarbaev'
				/>
			</div>
		</BottomSheet>
	)
}

export default ContactModal
