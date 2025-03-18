'use client'

import { useTheme } from 'next-themes'

import { Button } from 'ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'ui/dropdown-menu'

import { Moon, PcCase, Sun } from 'lucide-react'

import { cn } from 'utils'

const ModeToggle = () => {
	const { theme, setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon' className='rounded-full'>
					<Sun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
			>
				<DropdownMenuItem
					onClick={() => setTheme('light')}
					className={cn(theme === 'light' && 'text-accent-foreground', 'gap-2')}
				>
					<Sun className='size-[1rem]' />
					Light
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme('dark')}
					className={cn(theme === 'dark' && 'text-accent-foreground', 'gap-2')}
				>
					<Moon className='size-[1rem]' />
					Dark
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme('system')}
					className={cn(
						theme === 'system' && 'text-accent-foreground',
						'gap-2'
					)}
				>
					<PcCase className='size-[1rem]' />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ModeToggle
