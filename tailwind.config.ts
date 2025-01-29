import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
	darkMode: ['class'],
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/shared/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				sm: '600px',
				md: '650px',
				lg: '700px',
			},
		},
		containerFluid: {
			center: true,
			padding: '0.5rem',
			screens: {
				sm: '600px',
				md: '650px',
				lg: '700px',
			},
		},
		screens: {
			sm: '550px',
			md: '650px',
			lg: '700px',
		},
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'border-beam': {
					'100%': {
						'offset-distance': '100%',
					},
				},
			},
			animation: {
				'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(function ({ addUtilities, theme }) {
			const containerFluidUtilities = {
				'.container-fluid': {
					width: '100%',
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingLeft: theme('containerFluid.padding', '0.5rem'),
					paddingRight: theme('containerFluid.padding', '0.5rem'),
					'@screen sm': {
						maxWidth: theme('containerFluid.screens.sm', '100%'),
					},
					'@screen md': {
						maxWidth: theme('containerFluid.screens.md', '100%'),
					},
					'@screen lg': {
						maxWidth: theme('containerFluid.screens.lg', '100%'),
					},
				},
			}
			addUtilities(containerFluidUtilities)
		}),
	],
} satisfies Config
