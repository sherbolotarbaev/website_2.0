import * as z from 'zod'

export const ContactFormSchema = z.object({
	email: z
		.string({
			required_error: 'Please enter your email address.',
		})
		.email({
			message: 'Please enter a valid email address.',
		}),
	message: z
		.string({
			required_error: 'Please enter your message.',
		})
		.min(1, {
			message: 'Your message cannot be empty.',
		})
		.max(500, {
			message: 'Your message must be 500 characters or less.',
		}),
})
