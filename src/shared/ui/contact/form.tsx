'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import SubmitButton from 'shared/ui/button/submit'
import { Button } from 'ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'
import { Textarea } from 'ui/textarea'

import { closeModal } from 'features/modal-slice'
import { euclidSemiBold } from 'fonts'
import { useMediaQuery } from 'hooks/use-media-query'
import { ContactFormSchema } from 'lib/schema'
import { cn } from 'utils'

import { Mail } from 'lucide-react'
import { useDispatch } from 'react-redux'

const ContactForm: React.FC = ({}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const dispatch = useDispatch()

	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
	})

	const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
		try {
			console.dir(data)
		} catch (error: any) {}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-5'
			>
				<div className='space-y-2'>
					<h1
						className='text-xl font-semibold tracking-tight'
						style={euclidSemiBold.style}
					>
						Contact me<span className='text-[#6A61FF]'>.</span>
					</h1>

					<p className='text-sm text-muted-foreground'>
						Have a question, a project idea, or just want to say hello? Drop me
						a message below, and I'll get back to you as soon as possible.
					</p>
				</div>

				<div className='space-y-3'>
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
										// disabled={isLoading || isSuccess}
										autoComplete='email'
										{...field}
									/>
								</FormControl>

								{/* {error ? (
								<FormMessage className='text-error text-center flex items-center gap-1'>
									<CircleAlert className='size-4' /> {error}
								</FormMessage>
							) : (
								
							)} */}

								<FormMessage className='text-error' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='message'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										className={cn(
											form.formState.errors.email && 'border-error',
											'max-h-72'
										)}
										placeholder='Message'
										// disabled={isLoading || isSuccess}
										autoComplete='email'
										{...field}
									/>
								</FormControl>

								{/* {error ? (
								<FormMessage className='text-error text-center flex items-center gap-1'>
									<CircleAlert className='size-4' /> {error}
								</FormMessage>
							) : (
								
							)} */}

								<FormMessage className='text-error' />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex items-center justify-end gap-2'>
					{!isDesktop && (
						<Button
							type='button'
							variant='outline'
							onClick={() => dispatch(closeModal())}
						>
							Cancel
						</Button>
					)}

					<SubmitButton
						// isLoading={isLoading}
						// disabled={isSuccess}
						isLoading={false}
						disabled={!form.formState.isDirty || !form.formState.isValid}
						loadingText='Sending...'
					>
						<Mail className='size-4' /> Send
					</SubmitButton>
				</div>
			</form>
		</Form>
	)
}

export default ContactForm
