import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ModalTypesEnum {
	CONTACT = 'CONTACT',
}

interface ModalState {
	isOpen: boolean
	modalType: ModalTypesEnum | null
}

const initialState: ModalState = {
	isOpen: false,
	modalType: null,
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<{ type: ModalTypesEnum }>) => {
			state.isOpen = true
			state.modalType = action.payload.type
		},
		closeModal: state => {
			state.isOpen = false
			state.modalType = null
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
