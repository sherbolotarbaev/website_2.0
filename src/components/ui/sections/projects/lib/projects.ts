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
			'Your gateway to seamless trade between China and the world. Track orders, manage shipments, and optimize your international business with real-time updates and comprehensive logistics solutions.',
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
		],
	},
	{
		title: 'Personal API',
		description:
			'A scalable personal API using NestJS and TypeScript for user authentication, session management, and data storage with Prisma and PostgreSQL. Features OAuth2 via Passport.js and Supabase for real-time updates and storage.',
		image: '/images/nestjs.png',
		repo: 'https://github.com/sherbolotarbaev/api',
		technologies: [
			'Nest.js',
			'TypeScript',
			'Prisma',
			'PostgreSQL',
			'OAuth2',
			'Passport.js',
			'Express session',
		],
	},
]
