import Footer from 'widgets/footer'
import Header from 'widgets/header'

import ContactModal from 'shared/ui/contact/modal'

interface BaseLayoutProps {
	children: React.ReactNode
}

export default function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
	return (
		<div
			data-vaul-drawer-wrapper=''
			className='bg-muted dark:bg-background rounded-t-none'
		>
			<Header />
			<main className='mt-4 mb-8'>{children}</main>
			<Footer />

			<ContactModal />
		</div>
	)
}
