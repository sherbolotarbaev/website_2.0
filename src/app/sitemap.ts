import { PagesEnum } from 'config/pages'
import { siteConfig } from 'config/site'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = Object.values(PagesEnum).map(route => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...routes]
}
