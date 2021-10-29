import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'

function App() {
	const [pageIndex, setPageIndex] = useState(0)
	const [followers, setFollowers] = useState([])
	const { loading, data } = useFetch()

	useEffect(() => {
		if (!loading) setFollowers(data[pageIndex])
	}, [loading, pageIndex, data])

	return (
		<main>
			<section className='section-title'>
				<h1>{loading ? 'loading...' : 'pagination'}</h1>
				<div className='underline'></div>
			</section>
			<section className='followers'>
				<div className='container'>
					{followers.map((follower) => (
						<Follower key={follower.id} {...follower} />
					))}
				</div>
				{!loading && (
					<div className='btn-container'>
						<button
							className='prev-btn'
							onClick={() => setPageIndex(0)}
							disabled={pageIndex <= 0}
						>
							{'<<'}
						</button>
						<button
							className='prev-btn'
							onClick={() => setPageIndex((prev) => prev - 1)}
							disabled={pageIndex <= 0}
						>
							{'<'}
						</button>
						{data.map((_, index) => (
							<button
								key={index}
								className={`page-btn ${
									index === pageIndex ? 'active-btn' : ''
								}`}
								onClick={() => setPageIndex(index)}
							>
								{index + 1}
							</button>
						))}
						<button
							className='next-btn'
							onClick={() => setPageIndex((prev) => prev + 1)}
							disabled={pageIndex >= data.length - 1}
						>
							{'>'}
						</button>
						<button
							className='next-btn'
							onClick={() => setPageIndex(data.length - 1)}
							disabled={pageIndex >= data.length - 1}
						>
							{'>>'}
						</button>
					</div>
				)}
			</section>
		</main>
	)
}

export default App
