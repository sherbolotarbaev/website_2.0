'use server'

import { formatInTimeZone } from 'date-fns-tz'
import { ContactFormSchema } from 'lib/schema'
import { headers as requestHeaders } from 'next/headers'
import { userAgent as getUserAgent } from 'next/server'
import type { z } from 'zod'

async function getLocation(ip: string) {
	const res = await fetch(`https://ipwho.is/${ip}`, {
		headers: {
			origin: 'https://ipwho.is',
		},
	})
	return res.json()
}

const escapeHTML = (str: string) =>
	str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function newMessage(
	formData: z.infer<typeof ContactFormSchema>
): Promise<{ status: 'success' | 'error'; reason?: string }> {
	const BOT_TOKEN = process.env.TELEGRAM_BOT_API_KEY
	const CHAT_ID = process.env.TELEGRAM_BOT_CHAT_ID

	if (!BOT_TOKEN) {
		return {
			status: 'error',
			reason: '`TELEGRAM_BOT_API_KEY` is not defined in environment variables.',
		}
	}

	if (!CHAT_ID) {
		return {
			status: 'error',
			reason: '`TELEGRAM_BOT_CHAT_ID` is not defined in environment variables.',
		}
	}

	const headers = await requestHeaders()
	const ip =
		headers.get('x-forwarded-for') ||
		headers.get('x-real-ip') ||
		headers.get('x-client-ip') ||
		'127.0.0.1'

	const { os, device } = getUserAgent({ headers })
	const userAgent = `${os.name || 'Unknown'} ${os.version || 'Unknown'} (${
		device.vendor || 'Unknown'
	}, ${device.model || 'Unknown'})`

	const location = await getLocation(ip)
	if (
		!location ||
		!location.timezone ||
		!location.city ||
		!location.region ||
		!location.country
	) {
		return {
			status: 'error',
			reason: 'Failed to get location.',
		}
	}

	const time = formatInTimeZone(
		new Date(),
		location.timezone.id,
		'MMM dd, yyyy | HH:mm:ss'
	)

	try {
		const validatedFields = ContactFormSchema.safeParse(formData)

		if (!validatedFields.success) {
			return {
				status: 'error',
				reason: 'Invalid form data.',
			}
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
	} catch (error: any) {
		return {
			status: 'error',
			reason: `Error: ${error.message} Location: ${location.city}, ${
				location.region
			}, ${location.country} IP: ${ip} Telegram Bot Token: ${
				BOT_TOKEN.substring(0, 6) + '*'.repeat(BOT_TOKEN.length - 6)
			} Telegram Chat ID: ${
				CHAT_ID?.substring(0, 3) + '*'.repeat(CHAT_ID?.length - 6)
			}`,
		}
	}
}
