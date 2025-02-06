'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import SubmitButton from 'shared/ui/button/submit'
import { Button } from 'ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'
import { Textarea } from 'ui/textarea'

import { ContactFormSchema } from 'lib/schema'
import { cn } from 'utils'

const ContactForm: React.FC = () => {
	const [step, setStep] = useState<'email' | 'message'>('email')
	const [isSent, setIsSent] = useState(false)

	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
		try {
			setIsSent(true)
			console.dir(data)
			// Handle form submission here
		} catch (error: any) {
			console.error('Form submission error:', error)
		}
	}

	const handleNextStep = () => {
		form.trigger('email').then(isValid => {
			if (isValid) {
				setStep('message')
			}
		})
	}

	if (isSent) {
		return (
			<div className='bg-green-500/20 border border-green-500 text-green-800 dark:text-green-400 p-4 rounded-xl mb-2'>
				Message successfully sent!
			</div>
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-3'
			>
				{step === 'email' && (
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='email'
										className={cn(
											form.formState.errors.email && 'border-error'
										)}
										placeholder='Email Address'
										autoComplete='email'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-error' />
							</FormItem>
						)}
					/>
				)}
				{step === 'message' && (
					<FormField
						control={form.control}
						name='message'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										className={cn(
											form.formState.errors.message && 'border-error',
											'max-h-72'
										)}
										placeholder='Message'
										autoComplete='off'
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-error' />
							</FormItem>
						)}
					/>
				)}

				<div className='flex items-center justify-end flex-col-reverse gap-2 sm:flex-row'>
					{step === 'email' ? (
						<Button
							type='button'
							onClick={handleNextStep}
							// disabled={!form.formState.isValid || !form.formState.isDirty}
							className='w-full sm:w-auto'
						>
							Next
						</Button>
					) : (
						<SubmitButton
							isLoading={form.formState.isSubmitting}
							disabled={!form.formState.isValid || !form.formState.isDirty}
							loadingText='Sending...'
							className='w-full sm:w-auto'
						>
							Send
						</SubmitButton>
					)}
				</div>
			</form>
		</Form>
	)
}

export default ContactForm
