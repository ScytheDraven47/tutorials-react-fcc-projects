import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
	const {
		isWaiting,
		isLoading,
		questions,
		index,
		userAnswers,
		handleAnswer,
		nextQuestion,
	} = useGlobalContext()

	if (isWaiting) return <SetupForm />

	if (isLoading) return <Loading />

	const { question, incorrect_answers, correct_answer } = questions[index]
	const answers = [...incorrect_answers, correct_answer]
	let currentIndex = answers.length,
		randomIndex
	while (currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
		;[answers[currentIndex], answers[randomIndex]] = [
			answers[randomIndex],
			answers[currentIndex],
		]
	}

	return (
		<main>
			<Modal />
			<section className='quiz'>
				<p className='correct-answers'>
					correct answers:{' '}
					{userAnswers.reduce(
						(total, answer) => total + (answer.isCorrect ? 1 : 0),
						0
					)}
					/{index}
				</p>
				<article className='container'>
					<h2 dangerouslySetInnerHTML={{ __html: question }} />
					<div className='btn-container'>
						{answers.map((answer, index) => (
							<button
								key={index}
								className='answer-btn'
								dangerouslySetInnerHTML={{ __html: answer }}
								onClick={() =>
									handleAnswer(
										answer === correct_answer,
										answer
									)
								}
							/>
						))}
					</div>
				</article>
				<button className='next-question' onClick={nextQuestion}>
					{index === questions.length - 1
						? 'submit'
						: 'next question'}
				</button>
			</section>
		</main>
	)
}

export default App
