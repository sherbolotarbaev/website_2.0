'use server'

import { formatInTimeZone } from 'date-fns-tz'
import { ContactFormSchema } from 'lib/schema'
import { headers as requestHeaders } from 'next/headers'
import { userAgent as getUserAgent } from 'next/server'
import type { z } from 'zod'

const BOT_TOKEN = process.env.TELEGRAM_BOT_API_KEY
const CHAT_ID = process.env.TELEGRAM_BOT_CHAT_ID

async function getLocation(ip: string) {
	const response = await fetch(`https://ipwho.is/${ip}`)
	return response.json()
}

const escapeHTML = (str: string) =>
	str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function newMessage(
	formData: z.infer<typeof ContactFormSchema>
): Promise<{ status: 'success' | 'error' }> {
	const headers = await requestHeaders()
	// const ip =
	// 	headers.get('x-forwarded-for') ||
	// 	headers.get('x-real-ip') ||
	// 	headers.get('x-client-ip')
	let ip = '213.109.66.118'
	const { os, device } = getUserAgent({ headers })
	const userAgent = `${os.name || 'Unknown'} ${os.version || 'Unknown'} (${
		device.vendor || 'Unknown'
	}, ${device.model || 'Unknown'})`
	const location = await getLocation(ip)
	const time = formatInTimeZone(
		new Date(),
		location.timezone.id,
		'MMM dd, yyyy | HH:mm:ss'
	)

	try {
		const validatedFields = ContactFormSchema.safeParse(formData)

		if (!validatedFields.success) {
			return { status: 'error' }
		}

		const message = `
<b>New Contact Form Submission</b>

<b>From:</b> <i>${escapeHTML(validatedFields.data.email)}</i>
<b>Message:</b>
<i>${escapeHTML(validatedFields.data.message)}</i>

<pre>
<b>Metadata</b>
<b>Device Info:</b> <i>${escapeHTML(userAgent)}</i>
<b>IP Address:</b> <i>${escapeHTML(ip || 'Not available')}</i>
<b>Location:</b> ${location.flag.emoji} ${location.city}, ${location.region}, ${
			location.country
		}
<b>Time:</b> ${time} (${location.timezone.id})
</pre>
`

		const res = await fetch(
			`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: CHAT_ID,
					text: message,
					parse_mode: 'HTML',
				}),
			}
		)

		if (!res.ok) {
			throw new Error('Failed to send message to Telegram.')
		}

		return { status: 'success' }
	} catch (error) {
		console.error('Error processing contact form:', error)
		return { status: 'error' }
	}
}
