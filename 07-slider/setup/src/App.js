import React, { useState, useEffect } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import data from './data'

function App() {
	return (
		<section className='section'>
			<Title />
			<Slider />
		</section>
	)
}

const Title = () => (
	<div className='title'>
		<h2>
			<span>/</span>reviews
		</h2>
	</div>
)

const Slider = () => {
	const [people, setPeople] = useState([])
	const [index, setIndex] = useState(0)

	useEffect(() => setPeople(data), [])

	useEffect(() => {
		const slider = setInterval(() => setIndex((prev) => prev + 1), 3000)
		return () => clearInterval(slider)
	}, [index])

	useEffect(() => {
		if (index < 0) setIndex(people.length - 1)
		else if (index > people.length - 1) setIndex(0)
	}, [index, people])

	return (
		<div className='section-center'>
			{people.map((person, personIndex) => {
				let position
				if (personIndex === index) {
					position = 'activeSlide'
				} else if (
					personIndex === index - 1 ||
					(index === 0 && personIndex === people.length - 1)
				) {
					position = 'lastSlide'
				} else {
					position = 'nextSlide'
				}

				return <Person person={person} position={position} />
			})}
			<button className='prev' onClick={() => setIndex(index - 1)}>
				<FiChevronLeft />
			</button>
			<button className='next' onClick={() => setIndex(index + 1)}>
				<FiChevronRight />
			</button>
		</div>
	)
}

const Person = ({ person, position }) => {
	const { id, image, name, title, quote } = person

	return (
		<article className={position} key={id}>
			<img className='person-img' src={image} alt={name} />
			<h4>{name}</h4>
			<p className='title'>{title}</p>
			<p className='text'>{quote}</p>
			<FaQuoteRight className='icon' />
		</article>
	)
}

export default App
