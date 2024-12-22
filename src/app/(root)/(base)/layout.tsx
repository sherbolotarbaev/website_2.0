import Footer from 'widgets/footer'
import Header from 'widgets/header'

import ContactModal from 'shared/ui/contact/modal'

interface BaseLayoutProps {
	children: React.ReactNode
}

export default function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
	return (
		<>
			<Header />
			<main className='my-14'>{children}</main>
			<Footer />

			<ContactModal />
		</>
	)
}
