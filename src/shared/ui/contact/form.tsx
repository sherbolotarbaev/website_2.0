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
import { useMediaQuery } from 'hooks/use-media-query'
import { ContactFormSchema } from 'lib/schema'
import { cn } from 'utils'

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
											form.formState.errors.message && 'border-error',
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

				<div className='flex items-center justify-end flex-col-reverse gap-2 sm:flex-row'>
					{!isDesktop && (
						<Button
							type='button'
							variant='ghost'
							onClick={() => dispatch(closeModal())}
							className='w-full sm:w-auto'
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
						className='w-full sm:w-auto'
					>
						Send
					</SubmitButton>
				</div>
			</form>
		</Form>
	)
}

export default ContactForm
