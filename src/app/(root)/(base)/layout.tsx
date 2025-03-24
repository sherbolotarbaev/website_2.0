import Footer from 'widgets/footer'
import Header from 'widgets/header'

import ContactModal from 'shared/ui/contact/modal'
import { Toaster } from 'ui/toaster'

interface BaseLayoutProps {
	children: React.ReactNode
}

export default function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
	return (
		<div
			data-vaul-drawer-wrapper=''
			className='bg-background rounded-t-none custom-drawer-wrapper'
		>
			<ContactModal />

			<Header />
			<main className='mb-8'>{children}</main>
			<Footer />

			<Toaster />
		</div>
	)
}
