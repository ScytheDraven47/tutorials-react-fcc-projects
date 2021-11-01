import React from 'react'
import { useGlobalContext } from './context'

const categories = [
	{ id: 20, value: 'mythology' },
	{ id: 21, value: 'sports' },
	{ id: 23, value: 'history' },
	{ id: 24, value: 'politics' },
]
const difficulties = ['easy', 'medium', 'hard']

const SetupForm = () => {
	const { quiz, handleChange, handleSubmit, error } = useGlobalContext()

	return (
		<main>
			<section className='quiz quiz-small'>
				<form className='setup-form'>
					<div className='form-control'>
						<label htmlFor='amount'>number of questions</label>
						<input
							className='form-input'
							type='number'
							name='amount'
							id='amount'
							min={1}
							max={50}
							value={quiz.amount}
							onChange={handleChange}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='category'>Category</label>
						<select
							className='form-input'
							name='category'
							id='category'
							value={quiz.category}
							onChange={handleChange}
						>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.value}
								</option>
							))}
						</select>
					</div>
					<div className='form-control'>
						<label htmlFor='difficulty'>Difficulty</label>
						<select
							className='form-input'
							name='difficulty'
							id='difficulty'
							value={quiz.difficulty}
							onChange={handleChange}
						>
							{difficulties.map((difficulty, index) => (
								<option key={index} value={difficulty}>
									{difficulty}
								</option>
							))}
						</select>
					</div>
					{error && <p className='error'>{error}</p>}
					<button
						type='submit'
						className='submit-btn'
						onClick={handleSubmit}
					>
						start
					</button>
				</form>
			</section>
		</main>
	)
}

export default SetupForm
