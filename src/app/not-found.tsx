import type { Metadata } from 'next'

import NotFound from 'shared/ui/not-found'

export const metadata: Metadata = {
	title: '404 - Page Not Found',
}

export default function _404() {
	return <NotFound />
}
