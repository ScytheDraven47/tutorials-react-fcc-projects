import React, { useState } from 'react'
import data from './data'
import List from './List'

function App() {
	const [people, setPeople] = useState(data)

	const handleRemovePerson = (id) => {
		setPeople((prev) => prev.filter((person) => person.id !== id))
	}

	return (
		<main>
			<section className='container'>
				<h3>{people.length} birthdays today</h3>
				<List people={people} handleRemovePerson={handleRemovePerson} />
				<button onClick={() => setPeople([])}>clear all</button>
			</section>
		</main>
	)
}

export default App
