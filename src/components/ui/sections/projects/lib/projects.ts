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
		title: 'GIT Ingest (Node.js)',
		description:
			'Turn any Git repository into a prompt-friendly text ingest for LLMs.',
		image: '/images/git_ingest.png',
		repo: 'https://github.com/sherbolotarbaev/git_ingest',
		technologies: ['Node.js', 'TypeScript', 'Git'],
	},
	{
		title: 'Fastest API with Deno 2.0 & Hono.js',
		description:
			'This project showcases a performant API built with Deno 2.0 and Hono.js.',
		image: '/images/deno_honojs.png',
		repo: 'https://github.com/sherbolotarbaev/deno-hono',
		technologies: ['Deno 2.0', 'TypeScript', 'Hono.js', 'Zod'],
	},
	{
		title: 'ChinaTradeX',
		description:
			'Platform for seamless China-world trade with real-time order tracking and logistics management.',
		image: '/images/chinatradex.png',
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
	{
		title: 'Nest JS & Fastify Boilerplate',
		description:
			'A lightweight and efficient backend starter template built with Nest.js and Fastify, featuring Prisma ORM and TypeScript for scalable and modern server-side development.',
		image: '/images/nestjs_fastify.png',
		repo: 'https://github.com/sherbolotarbaev/NestFastifyApp',
		technologies: ['Nest.js', 'TypeScript', 'Prisma', 'Fastify'],
	},
]
