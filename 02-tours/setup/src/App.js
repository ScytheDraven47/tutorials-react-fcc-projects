import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

export const TourContext = React.createContext()

function App() {
	const [loading, setLoading] = useState(true)
	const [tours, setTours] = useState([])

	const handleRemoveTour = (id) => {
		setTours((prev) => prev.filter((tour) => tour.id !== id))
	}

	const fetchTours = async () => {
		setLoading(true)

		try {
			const response = await fetch(url)
			const tours = await response.json()
			setLoading(false)
			setTours(tours)
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	useEffect(() => {
		fetchTours()
	}, [])

	if (loading) {
		return (
			<main>
				<Loading />
			</main>
		)
	}

	if (tours.length === 0) {
		return (
			<main>
				<div className='title'>
					<h2>no tours left</h2>
					<button className='btn' onClick={fetchTours}>
						get more
					</button>
				</div>
			</main>
		)
	}

	return (
		<TourContext.Provider value={{ handleRemoveTour }}>
			<main>
				<Tours tours={tours} />
			</main>
		</TourContext.Provider>
	)
}

export default App
