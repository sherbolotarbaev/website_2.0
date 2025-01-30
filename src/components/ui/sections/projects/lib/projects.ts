export type TProject = {
	title: string
	description: string
	image?: string
	repo?: string
	demo?: string
	technologies: string[]
}

export const projects: TProject[] = [
	{
		title: 'ChinaTradeX',
		description:
			'Platform for seamless China-world trade with real-time order tracking and logistics management.',
		image: '/images/chinatradex.png',
		repo: 'https://github.com/yourusername/project-one',
		demo: 'https://www.chinatradex.co',
		technologies: [
			'Next.js',
			'Nest.js',
			'Fastify',
			'TypeScript',
			'Prisma',
			'PostgreSQL',
			'Redis',
			'Tailwind CSS',
		],
	},
	{
		title: 'Personal API',
		description:
			'Scalable NestJS API with auth, session management, and real-time updates using Prisma and Supabase.',
		image: '/images/nestjs.png',
		repo: 'https://github.com/sherbolotarbaev/api',
		technologies: [
			'Nest.js',
			'TypeScript',
			'Prisma',
			'PostgreSQL',
			'OAuth2',
			'Passport.js',
			'Express Session',
		],
	},
]
