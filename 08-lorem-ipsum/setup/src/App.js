import React, { useState, useEffect, useCallback } from 'react'
import data from './data'
function App() {
	const [MIN, MAX] = [1, data.length]
	const [count, setCount] = useState(MIN)
	const [text, setText] = useState([])
	const [toolTipMessage, setToolTipMessage] = useState('')

	const handleOutOfBounds = useCallback(
		(constraintType) => {
			switch (constraintType) {
				case 'HIGH':
					setToolTipMessage(`No more than ${MAX}`)
					setCount(MAX)
					break
				case 'LOW':
					setToolTipMessage(`No less than ${MIN}`)
					setCount(MIN)
					break
				default:
			}
		},
		[MIN, MAX]
	)

	useEffect(() => {
		const toolTip = setTimeout(() => {
			setToolTipMessage('')
		}, 3000)
		return () => clearTimeout(toolTip)
	}, [toolTipMessage])

	useEffect(() => {
		if (count < MIN) handleOutOfBounds('LOW')
		else if (count > MAX) handleOutOfBounds('HIGH')
	}, [count, MIN, MAX, handleOutOfBounds])

	const handleSubmit = (e) => {
		e.preventDefault()
		setText(data.slice(0, count))
	}

	return (
		<section className='section-center'>
			<h3>tired of boring lorem ipsum?</h3>
			<form className='lorem-form' onSubmit={handleSubmit}>
				<label htmlFor='amount'>paragraphs:</label>
				<input
					type='number'
					name='amount'
					id='amount'
					value={count}
					onChange={(e) => setCount(parseInt(e.target.value))}
				/>
				<button type='submit' className='btn'>
					Generate
				</button>
			</form>
			{toolTipMessage && (
				<span style={{ color: 'darkorange' }}>{toolTipMessage}</span>
			)}
			<article className='lorem-text'>
				{text.map((item, index) => (
					<p key={index}>{item}</p>
				))}
			</article>
		</section>
	)
}

export default App
