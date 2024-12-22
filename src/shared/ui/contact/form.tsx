'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import SubmitButton from 'shared/ui/button/submit'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'
import { Textarea } from 'ui/textarea'

import { euclidSemiBold } from 'fonts'
import { ContactFormSchema } from 'lib/schema'
import { cn } from 'utils'

import { Mail } from 'lucide-react'

const ContactForm: React.FC = ({}) => {
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
				className='w-full flex flex-col gap-3'
			>
				<h1
					className='text-xl font-semibold tracking-tight'
					style={euclidSemiBold.style}
				>
					Contact me<span className='text-[#6A61FF]'>.</span>
				</h1>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='email'
									className={cn(form.formState.errors.email && 'border-error')}
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

				<SubmitButton
					// isLoading={isLoading}
					// disabled={isSuccess}
					isLoading={false}
					disabled={!form.formState.isDirty || !form.formState.isValid}
					loadingText='Sending...'
					className='max-w-[6.5rem] ml-auto'
				>
					<Mail className='size-4' /> Send
				</SubmitButton>
			</form>
		</Form>
	)
}

export default ContactForm
