import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [jobs, setJobs] = useState([])
	const [value, setValue] = useState(0)

	const fetchJobs = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(url)
			if (response.status !== 200)
				throw new Error(
					`unacceptable response: ${response.status} ${response.statusText}`
				)
			const newJobs = await response.json()
			setJobs(newJobs)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setIsError(true)
			throw new Error(error)
		}
	}

	useEffect(() => {
		fetchJobs()
		// return () => {
		//   cleanup
		// }
	}, [])

	if (isLoading) {
		return (
			<section className='section loading'>
				<h1>loading...</h1>
			</section>
		)
	}
	if (isError) {
		return (
			<section>
				<h1>ERROR</h1>
			</section>
		)
	}

	const { company, dates, duties, title } = jobs[value]

	return (
		<section className='section'>
			<div className='title'>
				<h2>experience</h2>
				<div className='underline'></div>
			</div>
			<div className='jobs-center'>
				{/* btn container */}
				<div className='btn-container'>
					{jobs.map((item, index) => (
						<button
							key={item.id}
							className={`job-btn ${
								index === value ? 'active-btn' : ''
							}`}
							onClick={() => setValue(index)}
						>
							{item.company}
						</button>
					))}
				</div>
				{/* job info */}
				<article className='job-info'>
					<h3>{title}</h3>
					<h4>{company}</h4>
					<p className='job-date'>{dates}</p>
					{duties.map((duty, index) => (
						<div key={index} className='job-desc'>
							<FaAngleDoubleRight className='job-icon' />
							<p>{duty}</p>
						</div>
					))}
				</article>
			</div>
		</section>
	)
}

export default App
