import { PagesEnum } from 'config/pages'

type Route = {
	name: string
	path: string
}

export const routes: Route[] = [
	{ name: 'Blog', path: PagesEnum.BLOG },
	// { name: 'Guestbook', path: PagesEnum.GUESTBOOK },
]
