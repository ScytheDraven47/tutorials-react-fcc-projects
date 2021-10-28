import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
	const [color, setColor] = useState('')
	const [isError, setIsError] = useState(false)
	const [list, setList] = useState(new Values('forestgreen').all(10))

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			let colors = new Values(color).all(10)
			setList(colors)
		} catch (error) {
			setIsError(true)
			console.warn(error)
		}
	}

	return (
		<>
			<section className='container'>
				<h3>tint/shade generator</h3>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={color}
						placeholder='#f00, rgb(255,0,0), red'
						className={isError ? 'error' : null}
						onChange={(e) => setColor(e.target.value)}
					/>
					<button className='btn' type='submit'>
						generate
					</button>
				</form>
			</section>
			<section className='colors'>
				{list.map((color, index) => (
					<SingleColor
						key={index}
						{...color}
						hex={color.hex}
						index={index}
					/>
				))}
			</section>
		</>
	)
}

export default App
