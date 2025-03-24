'use client'

import type React from 'react'

import { TooltipProvider } from 'ui/tooltip'
import ReduxProvider from './redux'
import ThemeProvider from './theme'

interface ProvidersProps {
	children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			<ReduxProvider>
				<TooltipProvider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						{children}
					</ThemeProvider>
				</TooltipProvider>
			</ReduxProvider>
		</>
	)
}

export default Providers
