'use client'

import type React from 'react'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { closeModal } from 'features/modal-slice'
import { toast } from 'hooks/use-toast'
import { useAppDispatch } from 'lib/store'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button } from 'ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'
import { Textarea } from 'ui/textarea'
import SubmitButton from '../button/submit'

import { newMessage } from 'actions/contact'
import { ContactFormSchema } from 'lib/schema'
import { cn } from 'utils'

const ContactForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const [step, setStep] = useState<'email' | 'message'>('email')

	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
		const result = await newMessage(data)
		if (result.status === 'success') {
			toast({
				title: 'Message sent!',
				description: 'Thank you for reaching out!',
				className:
					'bg-green-400/20 backdrop-blur-xl text-green-600 dark:text-green-300 border-green-500/50 rounded-xl',
				duration: 5000,
			})
			dispatch(closeModal())
		} else {
			toast({
				title: 'Message not sent!',
				description: 'Please try again.',
			})
		}
	}

	const handleNextStep = () => {
		form.trigger('email').then(isValid => {
			if (isValid) {
				setStep('message')
			}
		})
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
					<>
						<p className='text-sm text-muted-foreground'>
							From: {form.getValues('email')}{' '}
							<span
								className='text-primary underline cursor-pointer'
								onClick={() => setStep('email')}
							>
								edit
							</span>
						</p>
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
					</>
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
