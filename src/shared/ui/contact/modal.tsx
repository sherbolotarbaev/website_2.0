'use client'
import React, { useEffect } from 'react'

import { closeModal, ModalTypesEnum, openModal } from 'features/modal-slice'
import { RootState } from 'lib/store'
import { useDispatch, useSelector } from 'react-redux'

import BottomSheet from '../test-bottom.sheet'
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
			description="Have a question, a project idea, or just want to say hello? Drop me a message below, and I'll get back to you as soon as possible."
		>
			<ContactForm />
		</BottomSheet>
	)
}

export default ContactModal
