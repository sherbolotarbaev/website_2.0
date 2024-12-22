import Hero from 'ui/sections/hero'
import Work from 'ui/sections/work'

export default function Home() {
	return (
		<>
			<div className='container space-y-16'>
				<Hero />

				<Work />
			</div>
		</>
	)
}
