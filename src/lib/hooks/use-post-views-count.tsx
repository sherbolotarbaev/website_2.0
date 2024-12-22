'use client'

import { useMemo } from 'react'

function useGetPostViewsCount(allViews: PostView[], slug: string) {
	const viewsForPost = useMemo(
		() => allViews.find(view => view.slug === slug),
		[slug, allViews]
	)
	const count = viewsForPost?.viewsCount || 0
	return {
		views: count.toLocaleString(),
	}
}

export { useGetPostViewsCount }
