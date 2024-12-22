'use client'
import React, { useEffect } from 'react'

import { closeModal, ModalTypesEnum, openModal } from 'features/modal-slice'
import { RootState } from 'lib/store'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog, DialogContent, DialogTitle } from 'ui/dialog'
import ContactForm from './form'

import { euclidSemiBold } from 'fonts'

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
			'',
			document.title,
			window.location.pathname + window.location.search
		)
	}

	if (!isOpen || modalType !== ModalTypesEnum.CONTACT) {
		return null
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogTitle style={euclidSemiBold.style}>
					Contact me<span className='text-[#6A61FF]'>.</span>
				</DialogTitle>
				<ContactForm />
			</DialogContent>
		</Dialog>
	)
}

export default ContactModal
