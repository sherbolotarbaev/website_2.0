'use client'

import type React from 'react'

import ReduxProvider from './redux'
import ThemeProvider from './theme'

interface ProvidersProps {
	children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			<ReduxProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					{children}
				</ThemeProvider>
			</ReduxProvider>
		</>
	)
}

export default Providers
