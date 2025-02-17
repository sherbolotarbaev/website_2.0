import Hero from 'ui/sections/hero'
import Projects from 'ui/sections/projects'
import Work from 'ui/sections/work'

export default function Home() {
	return (
		<>
			<div className='container py-8 bg-background rounded-[32px] space-y-16'>
				<Hero />
				<Work />
				<Projects />
			</div>
		</>
	)
}
