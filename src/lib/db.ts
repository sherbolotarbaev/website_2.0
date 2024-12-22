'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { prisma } from './prisma'

export async function getViews() {
	noStore()
	try {
		return await prisma.postView.findMany()
	} catch (_) {
		return []
	}
}

export async function addView(slug: string) {
	noStore()
	try {
		const views = await prisma.postView.upsert({
			where: {
				slug,
			},
			create: {
				slug,
				viewsCount: 1,
			},
			update: {
				viewsCount: {
					increment: 1,
				},
			},
		})
		return views.viewsCount
	} catch (_) {
		return 0
	}
}
